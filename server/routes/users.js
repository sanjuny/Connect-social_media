var express = require('express');
var router = express.Router();
const { postSignup, postLogin, postverifyOtp, postUpload, getUsersPost, postaddlikes, postaddcomment, getcomments, getsuggestions, postfollow, getProfilePost, profilePicUpload, getUser, getUserData, getMyFollowers, getMyFollowing } = require('../Controller/Usercontroller');



const upload = require('../helpers/Multer')
const check = require('../Middleware/AuthMiddleware');

router.post('/signup', postSignup)
router.post('/login', postLogin)
router.post('/Verifyotp', postverifyOtp)

/* ------------------------ Datas protected with jwt ------------------------ */

router.post('/addNewPost', upload.single('file'), postUpload)

router.get('/getpost/:id', check, getUsersPost)

router.post('/addlike/:id', check, postaddlikes)

router.post('/addcomment/:id', check, postaddcomment)

router.get('/getcomment/:id', check, getcomments)

router.get('/getsuggestion', check, getsuggestions)

router.post('/addfollow/:id', check, postfollow)

router.get('/getprofilepost/:id', check, getProfilePost)

router.post('/geteditProfile/:id', upload.single('profilePic'), profilePicUpload)

router.get('/getUser/:userId', check, getUser)

router.get('/:id', check, getUserData)

router.get('/myFollowers/:id', check, getMyFollowers)

router.get('/myFollowing/:id', check, getMyFollowing)

/* ------------------------ Datas protected with jwt ------------------------ */

module.exports = router;
