var express = require('express');
var router = express.Router();

const {postSignup, postLogin, postverifyOtp} = require('../Controller/Usercontroller')

router.post('/signup', postSignup)
router.post('/login',postLogin)
router.post('/Verifyotp',postverifyOtp) 




module.exports = router;
