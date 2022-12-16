const Users = require('../Models/SignupSchema')
const OtpVerification = require('../Models/OtpSchema')
const Comment = require('../Models/CommentSchema')
const Post = require('../Models/PostSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const { Promise } = require('mongoose')
const { post } = require('../routes/users')
const users = require('../Models/SignupSchema')



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
    console.log(OTP, 'LLLL');
    let info = await transporter.sendMail({
      from: process.env.OTP_USER, // sender address
      to: OtpResult.email, // list of receivers
      subject: "Meassage From Connect", // Subject line
      html: `
          <div style="width: 100%; background-color: azure; padding: 5rem 0">
          <div style="max-width: 700px; background-color: lightcyan; margin: 0 auto">
            <div style="background-color:lightblue;display:flex;justify-content: center;">
            <a href="https://ibb.co/MBLxG17"><img src="https://i.ibb.co/MBLxG17/connect-logos-black.png" alt="connect-logos-black" border="0"></a>
            </div>
            <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
              <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
                Form Connect
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
      console.log(OTPVerification, "hgf");
      await OTPVerification.save();
    } else {
      await OtpVerification.updateOne(
        { userId: OtpResult._id },
        { OTP: hashOTP }
      );
    }

    transporter.sendMail(info, function (error, info) {
      console.log('passed');
      if (error) {
        console.log(error, 'hello');
      } else {
        // res.json({
        //   status: "pending",
        //   message: "OTPverification mail sent",
        //   mail: OtpResult.email,
        //   user: OtpResult
        // })
      }
    })
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error, 'error');
  }
}


const postSignup = async (req, res) => {
  try {
    console.log(req.body, 'pp');
    let { username, name, email, phone, password } = req.body;
    const userExist = await Users.findOne({ email, verified: 'verified' })
    if (userExist) {
      console.log('userwxis');
      res.status(200).json({ message: 'user already exisit with this mail id' })
    } else {
      console.log('opopoopopop');
      password = await bcrypt.hash(password, 10)
      const newUser = await new Users({
        username,
        name,
        email,
        phone: parseInt(phone),
        password,
      })
      console.log(newUser, "hgf");
      newUser.save().then((OtpResult) => {
        console.log(OtpResult, 'mmmm');
        sendOtp(OtpResult, res)
        res.status(200).json({ auth: true, data: OtpResult })
      })
      console.log(req.body);
    }
  } catch (error) {
    res.json('something went wrong')
  }
}

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
    console.log('ggggg');
    console.log(error);
    res.status(500).json(error)
  }
}


const postverifyOtp = async (req, res) => {
  console.log("reached");
  console.log(req.body.OTP);
  let OtpVerify = await OtpVerification.findOne({ userId: req.body.user });
  console.log(OtpVerify, "tttttt");
  let correctOtp = await bcrypt.compare(req.body.OTP, OtpVerify.Otp);
  console.log("correctOtp");
  console.log(correctOtp);
  if (correctOtp) {
    await Users.updateOne(
      { _id: req.body.user },
      { $set: { verified: "Verified" } }
    );
    res.status(200).json({ verified: true });
  } else {
    res.status(200).json({ verified: false, msg: "Incorrect OTP" });
    console.log('jjujuju');
  }
};


const postUpload = async (req, res) => {
  console.log('addPost reached');
  try {
    console.log(req.body, 'jhgfddfghj');
    console.log(req?.file?.filename, 'mmmmmmmmgggggmmmm');
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


const profilePicUpload = async (req, res) => {
  console.log(req.params.id, 'profilePicUpload');
  console.log(req.body, 'req,bodu');
  try {
    // let { userId, bio, name, username, phone, profilePic} = req.body

  } catch (error) {

  }
}


const getUsersPost = async (req, res) => {
  console.log(req.params.id, 'wretyu');
  try {
    let currentuser = await Users.findById(req.params.id)
    console.log(currentuser, "nnj");

    let posts = await Post.find({ userId: currentuser._id }).populate('userId').sort({ createdAt: -1 })
    console.log("posts");
    console.log(posts);
    let friendpost = await Promise.all(currentuser.following?.map((postId) => {
      return Post.find({ userId: postId }).populate('userId').sort({ createdAt: -1 })
    }))
    console.log("kkkkkkk");
    let data = posts.concat(...friendpost)
    console.log(data, "hihii");
    res.status(200).json(data)
  } catch (error) {
    console.log(error, "lknjn");
    res.status(500).json({ message: 'this file' })
  }
}






const postaddlikes = async (req, res) => {
  console.log(req.body, 'kkkkk');
  console.log(req.params.id, 'kikkk');
  console.log('call like');
  const post = await Post.findById(req.params.id)
  console.log(post, 'gfdvc');
  if (!post?.likes?.includes(req.body.userId)) {
    await post.updateOne({ $push: { likes: req.body.userId } })
    res.status(200).json({ message: 'post liked' })
  } else {
    await post.updateOne({ $pull: { likes: req.body.userId } })
    res.status(200).json({ message: 'post disliked' })
  }
}


const postaddcomment = async (req, res) => {
  const { comment, userId } = req.body.data
  console.log(req.body.data, 'commentvgh');
  const postId = req.params.id
  console.log(req.body, 'reqbody');
  console.log(req.params.id, 'rehcbdskhcscbs');
  try {
    await Comment.create({ userId, comment, postId })
    res.status(200).json({ message: 'comment added' })
  } catch (error) {
    console.log(error);
  }
}


const getcomments = async (req, res) => {
  console.log('hegeeg');
  const postId = req.params.id
  console.log(req.params.id, 'id hefre');
  try {
    let comments = await Comment.find({ postId: req.params.id }).populate('userId', 'name username')
    console.log(comments, 'gettting');
    res.status(200).json(comments)
  } catch (error) {
    res.status(500).json({ message: 'failed' })
  }
}


const getsuggestions = async (req, res) => {
  console.log('getsuggestions');
  try {
    let suggestions = await Users.find().limit(4)
    res.status(200).json(suggestions)
  } catch (error) {
    res.status(500).json({ message: 'failed' })

  }
}


const postfollow = async (req, res) => {
  console.log('follow reached');
  console.log(req.body, 'req.body');
  console.log(req.params.id, 'req.params.id,');
  try {
    let follow = await Users.findById(req.params.id)
    let following = await Users.findById(req.body.id)
    if (!follow?.following?.includes(req.body.id)) {
      console.log("followed");
      await follow.updateOne({ $push: { following: req.body.id } })
      await following.updateOne({ $push: { followers: req.params.id } })
      res.status(200).json("Followed")
    } else {
      console.log("unfollowed");
      await follow.updateOne({ $pull: { following: req.body.id } })
      await following.updateOne({ $pull: { followers: req.params.id } })
      res.status(200).json("You unfollowed this user")
    }
  } catch (error) {
    console.log(error, 'catch error');
  }
}

const getUser = async (req, res) => {
  const { userId } = req.params
  console.log(userId, 'ooooooooooooooo');
  try {
    const user = await Users.findById(userId)
    console.log(user, 'pppppppppp');
    const { phone, password, ...details } = user._doc
    res.status(200).json(details)
    console.log(details, 'llllllllllllllllll');
  } catch (error) {
    res.status(500).json(error);

  }
}


const getProfilePost = async (req, res) => {
  try {
    let currentuser = await Users.findById(req.params.id)
    let posts = await Post.find({ userId: currentuser._id }).populate('userId').sort({ createdAt: -1 })
    res.status(200).json(posts)
  } catch (error) {
    console.log(error, "lknjn");
    res.status(500).json(error)

  }

}

/* --------------------- GET USER DETAILS WITH USERNAME --------------------- */

const getUserData = async (req,res)=>{
  console.log('backend getuserdata');
  const username = req.query.username
  console.log(username,'backend username');
  try {
    const user = await Users.findOne({ username : username})
    console.log(user,'backend user');
    const { phone, password, ...details } = user._doc
    res.status(200).json(details)
    console.log(details,'backend details');
  } catch (error) {
    console.log(error,'error here');
    res.status(500).json(error)
  }
} 


/* ---------------------------- GET MY FOLLOWERS ---------------------------- */

const getMyFollowers = async (req,res) =>{
  console.log(req.params.id,'my followers');
  try {
    const user = await Users.findById(req.params.id)
    if(user){
      const followers = await Promise.all(
        user?.followers?.map((id)=>{
          return Users.findOne({_id: id}, { username:1, name:1, profilePic:1})
        })
      )
      res.status(200).json(followers)
    }else{
      res.status(402).json('pleadse tru again')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

/* ---------------------------- GET MY FOLLOWING ---------------------------- */

const getMyFollowing = async (req,res) =>{
  console.log(req.params.id,'my following');
  try {
    const user = await Users.findById(req.params.id)
    if(user){
      const following = await Promise.all(
        user?.following?.map((id)=>{
          return Users.findOne({_id: id}, { username:1, name:1, profilePic:1})
        })
      )
      res.status(200).json(following)
    }else{
      res.status(402).json('pleadse tru again')
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}








module.exports = { postSignup, postLogin, sendOtp, postverifyOtp, postUpload, getUsersPost, postaddlikes, postaddcomment, getcomments, getsuggestions, postfollow, getProfilePost, profilePicUpload, getUser, getUserData, getMyFollowers, getMyFollowing }