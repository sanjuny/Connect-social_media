var express = require('express');
var router = express.Router();

const {postSignup} = require('../Controller/Usercontroller')

router.post('/signup', postSignup)



module.exports = router;
