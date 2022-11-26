var express = require('express');
var router = express.Router();

const {postSignup, postLogin} = require('../Controller/Usercontroller')

router.post('/signup', postSignup)
router.post('/login',postLogin)



module.exports = router;
