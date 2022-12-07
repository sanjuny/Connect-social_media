var express = require('express');
var router = express.Router();

const {postSignup, postLogin, postverifyOtp, postUpload, getUsersPost, postaddlikes, postaddcomment, getcomments} = require('../Controller/Usercontroller');
const upload = require('../helpers/Multer');
const check = require('../Middleware/AuthMiddleware');

router.post('/signup', postSignup)
router.post('/login',postLogin)
router.post('/Verifyotp',postverifyOtp) 
router.post('/addpost',upload.single('file'),postUpload)
router.get('/getpost/',check,getUsersPost)
router.post('/addlike/:id',check,postaddlikes)
router.post('/addcomment/:id',check,postaddcomment)
router.get('/getcomment/',check,getcomments)


module.exports = router;
