const Users = require('../Models/SignupSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const OtpVerification = require('../Models/OtpSchema')



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
    const userExist = await Users.findOne({ email })
    if (userExist) {
      console.log('userwxis');
      res.status(200).json({ message: 'user already exisit with this mail id' })
    } else {
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
  console.log('calll');
  try {
    const users = await Users.findOne({ email: req.body.email })
    console.log(users, 'jjjj');
    if (users.status == 'inactive') {
      res.status(200).json({ message: 'Entered Email is blocked' })
    } else {
      if (users) {
        const id = users._id
        const pass = await bcrypt.compare(req.body.password, users.password)
        if (users.verified == 'Not Verified') {
          res.status(200).json({ message: 'You verification is not complete' })
        }else{
        if (pass) {
          console.log('kkkkkkkkkk');
          const token = jwt.sign({ id }, process.env.JWT_SECERT, {
            expiresIn: "365d",
          })
          console.log('fffffffffff');
          res.status(200).json({ auth: true, token: token, users: users })
        } else {
          console.log('uuuuuuuuuuuuuu');
          res.status(200).json({ message: 'password is not match' })
        }
      }
      } else {
        console.log('mmmmmmmm');
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


const addPost = async (req,res)=>{
  console.log('addPost reached');
  try {
    let { userId, Image, Description} = req.body;
    
    
  } catch (error) {
    
  }

}



module.exports = { postSignup, postLogin, sendOtp, postverifyOtp }