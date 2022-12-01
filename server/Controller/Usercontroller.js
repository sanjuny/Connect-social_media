const Users = require('../Models/SignupSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const OtpVerification = require('../Models/OtpSchema')



let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `connectmedia06@gmail.com`, // generated ethereal user
    pass: `hoatonwjofupkanh`, // generated ethereal password
  },
});

const sendOtp = async (OtpResult, res) => {
  try {
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(OTP, 'LLLL');
    let info = await transporter.sendMail({
      from: 'connectmedia06@gmail.com', // sender address
      to: "sanjuny07@gmail.com", // list of receivers
      subject: "Meassage From Connect", // Subject line
      html: `
          <div style="width: 100%; background-color: white; padding: 5rem 0">
          <div style="max-width: 700px; background-color: #D5D6D2; margin: 0 auto">
            <div style="width: 100%; background-color: black; padding: 20px 0">
            <a href="" ><img
                src="https://res.cloudinary.com/zpune/image/upload/v1652256707/random/favicon_hybtfj.png"
                style="width: 100%; height: 70px; object-fit: contain"
              /></a> 
            
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
    let { name, email, phone, password } = req.body;
    const userExist = await Users.findOne({ email })
    if (userExist) {
      console.log('userwxis');
      res.status(200).json({ message: 'user already exisit with this mail id' })
    } else {
      password = await bcrypt.hash(password, 10)
      const newUser = await new Users({
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
        if (users.verified == 'false') {
          res.status(200).json({ message: 'You verification is not complete' })
        }else{
        if (pass) {
          console.log('kkkkkkkkkk');
          const token = jwt.sign({ id }, process.env.JWT_SECERT, {
            expiresIn: 300,
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
      { $set: { verified: "true" } }
    );
    res.status(200).json({ verified: true });
  } else {
    res.status(200).json({ verified: false, msg: "Incorrect OTP" });
  }
};






// const sendOtp = async (result, res) => {
//     console.log(result, "hey there");
//     try {
//       const OTP = await Math.floor(100000 + Math.random() * 900000).toString();
//       console.log("OTP");
//       console.log(OTP);
//       var senEMail = {
//         from: "sanjuny07@gmail.com",
//         to: result.email,
//         subject: "Sending Email My Instagram",
//         text: `Hi ${result.username} Your OTP pin has been generated `,
//         html: `<h1>Hi ${result.username}</h1><p>Your OTP is ${OTP}</p>`,
//       };

//       let hashOTP = await bcrypt.hash(OTP, 10);
//       let verify = await userVerification.findOne({ userId: result._id });
//       if (!verify) {
//         const userverification = new userVerification({
//           userId: result._id,
//           Otp: hashOTP,
//           Created: Date.now(),
//           Expiry: Date.now() + 100000,
//         });
//         await userverification.save();
//       } else {
//         await userVerification.updateOne(
//           { userId: result._id },
//           { otp: hashOTP }
//         );
//       }

//       transporter.sendMail(senEMail, function (error, info) {
//         console.log("oioioioi");
//         if (error) {
//           console.log(error, "yuyuuy");
//         } else {
//           res.json({
//             status: "pending",
//             msg: "Verification otp mail sent",
//             mail: result.email,
//             user: result,
//           });
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

module.exports = { postSignup, postLogin, sendOtp, postverifyOtp }