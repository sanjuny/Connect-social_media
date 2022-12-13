var express = require('express');
var router = express.Router();

const { postSignup, postLogin, postverifyOtp, postUpload, getUsersPost, postaddlikes, postaddcomment, getcomments, getsuggestions, postfollow, getProfilePost, profilePicUpload } = require('../Controller/Usercontroller');
const upload = require('../helpers/Multer')
// const check = require('../Middleware/AuthMiddleware');

router.post('/signup', postSignup)
router.post('/login', postLogin)
router.post('/Verifyotp', postverifyOtp)
router.post('/addNewPost', upload.single('file'), postUpload)
router.get('/getpost/:id', getUsersPost)
router.post('/addlike/:id', postaddlikes)
router.post('/addcomment/:id', postaddcomment)
router.get('/getcomment/:id', getcomments)
router.get('/getsuggestion', getsuggestions)
router.post('/addfollow/:id', postfollow)
router.get('/getprofilepost/:id', getProfilePost)
router.post('/geteditProfile/:id',upload.single('profilePic'), profilePicUpload)

module.exports = router;
