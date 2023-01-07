const Users = require('../Models/SignupSchema')
const OtpVerification = require('../Models/OtpSchema')
const Comment = require('../Models/CommentSchema')
const Post = require('../Models/PostSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const { post } = require('../routes/users')
const Notification = require('../Models/NotificationSchema')
const reported = require('../Models/ReportSchema')
const { json } = require('express')
const sanitizeHtml = require('sanitize-html');

var regex = /^[a-z0 -9_.-]*$/;


/* ----------------------------------- otp ---------------------------------- */

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.OTP_USER, // generated ethereal user
    pass: process.env.OTP_PASSWORD, // generated ethereal password
  },
});


const sendOtp = async (OtpResult, res) => {
  try {
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    let info = await transporter.sendMail({
      from: process.env.OTP_USER, // sender address
      to: OtpResult.email, // list of receivers
      subject: "Message From Connect", // Subject line
      html: `
          <div style="width: 100%; background-color: azure; padding: 5rem 0">
          <div style="max-width: 700px; background-color: lightcyan; margin: 0 auto">
            <div style="background-color:lightblue;display:flex;justify-content: center;">
            <a href="https://ibb.co/MBLxG17"><img src="https://i.ibb.co/MBLxG17/connect-logos-black.png" alt="connect-logos-black" border="0"></a>
            </div>
            <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
              <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
                From Connect
              </p>
              <div style="font-size: .8rem; margin: 0 30px">
              <p>OTP: <b>${OTP}</b> is your one time password(OTP) to log in to Connect. Please enter OTP to proceed.</p>
              </div>
            </div>
          </div>
        </div>
          `, // html body
    });

    let hashOTP = await bcrypt.hash(OTP, 10);
    let verify = await OtpVerification.findOne({ userId: OtpResult._id })
    if (!verify) {
      const OTPVerification = await new OtpVerification({
        userId: OtpResult._id,
        Otp: hashOTP,
        Created: Date.now(),
        Expiry: Date.now() + 100000,
      })
      await OTPVerification.save();
    } else {
      await OtpVerification.updateOne(
        { userId: OtpResult._id },
        { Otp: hashOTP }
      );
    }
  } catch (error) {
    res.status(500).json(error)
  }
}


/* -------------------------------- resendotp ------------------------------- */

const resendOtp = async (req, res) => {
  await sendOtp(req.body.data).then((response) => {
    res.status(200).json({ auth: true })
  })
}

/* --------------------------------- signup --------------------------------- */

const postSignup = async (req, res) => {
  try {
    let { username, name, email, phone, password } = req.body;
    const userExist = await Users.findOne({ email, verified: 'verified' })
    if (userExist) {
      res.status(200).json({ message: 'user already exisit with this mail id' })
    } else {
      password = await bcrypt.hash(password, 10)
      const newUser = await new Users({
        username,
        name,
        email,
        image: 'download.png',
        phone: parseInt(phone),
        password,
      })
      newUser.save().then((OtpResult) => {
        sendOtp(OtpResult, res)
        res.status(200).json({ auth: true, data: OtpResult })
      })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}


/* ---------------------------------- login --------------------------------- */

const postLogin = async (req, res) => {
  try {
    const users = await Users.findOne({ email: req.body.email })

    if (users.status == 'inactive') {
      res.status(200).json({ message: 'Entered Email is blocked' })
    } else {
      if (users) {
        const id = users._id
        const pass = await bcrypt.compare(req.body.password, users.password)
        if (users.verified == 'Not Verified') {
          res.status(200).json({ message: 'You verification is not complete' })
        } else {
          if (pass) {
            const token = jwt.sign({ id }, process.env.JWT_SECERT, {
              expiresIn: "365d",
            })
            res.status(200).json({ auth: true, token: token, users: users })
          } else {
            res.status(200).json({ message: 'password is not match' })
          }
        }
      } else {
        res.status(200).json({ message: 'user doesnt exist' })
      }
    }

  } catch (error) {
    res.status(500).json(error)
  }
}

/* ------------------------------- verify otp ------------------------------- */

const postverifyOtp = async (req, res) => {
  let OtpVerify = await OtpVerification.findOne({ userId: req.body.user });
  let correctOtp = await bcrypt.compare(req.body.OTP, OtpVerify.Otp);
  if (correctOtp) {
    await Users.updateOne(
      { _id: req.body.user },
      { $set: { verified: "Verified" } }
    );
    res.status(200).json({ verified: true });
  } else {
    res.status(200).json({ verified: false, msg: "Incorrect OTP" });
  }
};

/* ----------------------------- uploading post ----------------------------- */

const postUpload = async (req, res) => {
  try {
    let { userId, description } = req.body;
    let image = req?.file?.filename
    await Post.create({ userId, description, image }).then((response) => {
      res.status(200).json({ message: 'post added sucessfully' })
    }).catch((err) => {
      res.status(500).json({ message: 'Unabel to add the post' })
    })
  } catch (error) {
    res.status(500).json({ message: 'Unabel to add the post file' })
  }
}


/* --------------------------- update userdetails --------------------------- */

const getupdatedetails = async (req, res) => {
  try {
    let find = await Users.findOne({ username: req.body.data.username })
    if (find._id == req.params.id) {
      await Users.updateOne({ _id: req.params.id }, {
        $set: req.body.data
      })
      res.status(200).json("updated")
    } else {
      res.status(401).json({ message: 'already exists' })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

/* ------------------------------ get user post ----------------------------- */

const getUsersPost = async (req, res) => {
  try {
    let currentuser = await Users.findById(req.params.id)
    let posts = await Post.find({ userId: currentuser._id }).populate('userId').sort({ createdAt: -1 })
    let friendpost = await Promise.all(currentuser.following?.map((postId) => {
      return Post.find({ userId: postId, reports: { $ne: req.params.id }, status: 'active' }).populate('userId').sort({ createdAt: -1 })
    }))
    let data = posts.concat(...friendpost)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ message: 'this file' })
  }
}


/* ----------------------------- likes handling ----------------------------- */

const postaddlikes = async (req, res) => {
  const post = await Post.findById(req.params.id)
  const details = {
    desc: 'liked your post',
    time: Date.now(),
    user: req.body.userId
  }
  if (!post?.likes?.includes(req.body.userId)) {
    await post.updateOne({ $push: { likes: req.body.userId } })
    if (post.userId != req.body.userId) {
      await Notification.updateOne({ userId: post.userId }, {
        $push: {
          Notification: details
        }
      }, { upsert: true })
    }
    res.status(200).json({ message: 'post liked' })
  } else {
    await post.updateOne({ $pull: { likes: req.body.userId } })
    res.status(200).json({ message: 'post disliked' })
  }
}

/* ---------------------------- comments handling --------------------------- */

const postaddcomment = async (req, res) => {
  const { comment, userId, postUser } = req.body.data
  const postId = req.params.id
  const details = {
    desc: 'Commented on your post',
    time: Date.now(),
    user: userId
  }
  try {
    const ha = await Comment.create({ userId, comment, postId })
    const fr = await Notification.updateOne({ userId: postUser }, {
      $push: {
        Notification: details
      }
    }, { upsert: true })
    res.status(200).json({ message: 'comment added successfully' })
  } catch (error) {
    res.status(500).json(error)
  }
}

/* ---------------------------- fetching comments --------------------------- */

const getcomments = async (req, res) => {
  const postId = req.params.id
  try {
    let comments = await Comment.find({ postId: req.params.id }).populate('userId', 'name username image')
    res.status(200).json(comments)
  } catch (error) {
    res.status(500).json({ message: 'failed' })
  }
}

/* -------------------------- suggestions for users ------------------------- */

const getsuggestions = async (req, res) => {
  try {
    let suggestions = await Users.find().limit(5)
    res.status(200).json(suggestions)
  } catch (error) {
    res.status(500).json({ message: 'failed' })
  }
}

/* ----------------------------- follow handling ---------------------------- */

const postfollow = async (req, res) => {
  try {
    let follow = await Users.findById(req.params.id)
    let following = await Users.findById(req.body.id)
    if (!follow?.following?.includes(req.body.id)) {
      await follow.updateOne({ $push: { following: req.body.id } })
      await following.updateOne({ $push: { followers: req.params.id } })
      res.status(200).json("Followed")
    } else {
      await follow.updateOne({ $pull: { following: req.body.id } })
      await following.updateOne({ $pull: { followers: req.params.id } })
      res.status(200).json("You unfollowed this user")
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

/* ------------------------------ getiing user ------------------------------ */

const getUser = async (req, res) => {
  const { userId } = req.params
  try {
    const user = await Users.findById(userId)
    const { phone, password, ...details } = user._doc
    res.status(200).json(details)
  } catch (error) {
    res.status(500).json(error);
  }
}

/* -------------------------- fetching profile post ------------------------- */

const getProfilePost = async (req, res) => {
  try {
    let currentuser = await Users.findById(req.params.id)
    let posts = await Post.find({ userId: currentuser._id }).populate('userId').sort({ createdAt: -1 })
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }
}

/* --------------------- GET USER DETAILS WITH USERNAME --------------------- */

const getUserData = async (req, res) => {
  if (regex.test) {
    const username = req.query.username
    try {
      const user = await Users.findOne({ username: username })
      const { phone, password, ...details } = user._doc
      res.status(200).json(details)
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(400).json({ message: 'it is' })
  }

}


/* ---------------------------- GET MY FOLLOWERS ---------------------------- */

const getMyFollowers = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id)
    if (user) {
      const followers = await Promise.all(
        user?.followers?.map((id) => {
          return Users.findOne({ _id: id }, { username: 1, name: 1, image: 1 })
        })
      )
      res.status(200).json(followers)
    } else {
      res.status(402).json('pleadse try again')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

/* ---------------------------- GET MY FOLLOWING ---------------------------- */

const getMyFollowing = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id)
    if (user) {
      const following = await Promise.all(
        user?.following?.map((id) => {
          return Users.findOne({ _id: id }, { username: 1, name: 1, image: 1 })
        })
      )
      res.status(200).json(following)
    } else {
      res.status(402).json('pleadse tru again')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}



/* ----------------------------- SEARCH FOR USER ---------------------------- */

const searchUsers = async (req, res) => {

  const data = req.params.id
  try {
    const users = await Users.find(
      { username: { $regex: "^" + data, $options: "i" } },
      { name: 1, username: 1, image: 1 }
    )
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json(error)
  }
}


/* ------------------------------ getuser post profile ------------------------------ */

const userPostProfile = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    const userPosts = await Post.find({ userId: user._id }).sort({ createdAt: -1 });
    res.json(userPosts);
  } catch (error) {
    res.status(500).json('Something went wrong!')
  }
}


/* ----------------------------- get report post ---------------------------- */

const report = async (req, res) => {
  try {
    let postId = req.params.id
    let { userId, reportValue } = req.body
    let response = await Post.updateOne({ _id: postId }, { $push: { reports: userId } })
    await reported.create({
      userId: userId,
      postId: postId,
      reason: reportValue
    })
    res.json(200).status({ message: "reported" })
  } catch (error) {
    res.status(500).json(error)
  }
}


/* -------------------------- get all notifications ------------------------- */

const getAllNotification = async (req, res) => {
  try {
    const notifications = await Notification.findOne({ userId: req.params.id }, { _id: 0, Notification: 1 }).sort({ _id: -1 }).populate("Notification.user", "username image")
    const notify = notifications.Notification.reverse()
    res.status(200).json(notify)
  } catch (error) {
    res.status(500).json(error)
  }
}


/* ---------------------- fetch all notification count ---------------------- */

const NotificationCount = async (req, res) => {
  try {
    const result = await Notification.findOne({ userId: req.params.id })
    const unread = result.Notification.filter((data) => {
      if (data?.unRead === 'true') {
        return data
      }
    })
    res.status(200).json(unread.length)
  } catch (error) {
    res.status(500).json(error)
  }
}

/* ------------------------ manage notification if the user read the msg or not ----------------------- */

const manageNotification = async (req, res) => {
  try {
    await Notification.updateOne({ userId: req.params.id }, {
      $set: { 'Notification.$[].unRead': 'false' }
    })
    res.status(200).json('managed')
  } catch (error) {
    res.status(500), json(error)
  }
}

/* ---------------------------- delete user post ---------------------------- */

const deletepost = async (req, res) => {
  try {
    let result1 = await Post.findByIdAndDelete(req.params.id)
    let result2 = await Comment.deleteMany({ postId: req.params.id })
    res.status(200).json({ message: 'post deleted successfully' })
  } catch (error) {
    res.status(500).json(error)

  }

}

module.exports = {
  postSignup,
  postLogin,
  sendOtp,
  postverifyOtp,
  postUpload,
  getUsersPost,
  postaddlikes,
  postaddcomment,
  getcomments,
  getsuggestions,
  postfollow,
  getProfilePost,
  getUser,
  getUserData,
  getMyFollowers,
  getMyFollowing,
  searchUsers,
  userPostProfile,
  report,
  getAllNotification,
  NotificationCount,
  getupdatedetails,
  manageNotification,
  deletepost,
  resendOtp
}