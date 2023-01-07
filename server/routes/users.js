var express = require('express');
var router = express.Router();
const { postSignup, postLogin, postverifyOtp, postUpload, getUsersPost, postaddlikes, postaddcomment, getcomments, getsuggestions, postfollow, getProfilePost, getUser, getUserData, getMyFollowers, getMyFollowing, searchUsers, report, getAllNotification, NotificationCount, userPostProfile, getupdatedetails, manageNotification, deletepost, resendOtp } = require('../Controller/Usercontroller');



const upload = require('../helpers/Multer')
const check = require('../Middleware/AuthMiddleware');

router.post('/signup', postSignup)
router.post('/login', postLogin)
router.post('/Verifyotp', postverifyOtp)
router.post('/resendotp', resendOtp)

/* ------------------------ Datas protected with jwt ------------------------ */

router.post('/addNewPost', upload.single('file'), postUpload)

router.post('/photo', upload.single('file'), (req, res) => {
    let data = {
        image: req.file.filename,
    }
    res.status(200).json(data)
})

router.get('/getpost/:id([a-f0-9]{24})', check, getUsersPost)

router.post('/addlike/:id([a-f0-9]{24})', check, postaddlikes)

router.post('/addcomment/:id([a-f0-9]{24})', check, postaddcomment)

router.get('/getcomment/:id([a-f0-9]{24})', check, getcomments)

router.get('/getsuggestion', check, getsuggestions)

router.post('/addfollow/:id([a-f0-9]{24})', check, postfollow)

router.get('/getprofilepost/:id([a-f0-9]{24})', check, getProfilePost)

router.post('/updatedetails/:id([a-f0-9]{24})', check, getupdatedetails)

router.get('/getUser/:userId([a-f0-9]{24})', check, getUser)

router.get('/:id', check, getUserData)

router.get('/myFollowers/:id([a-f0-9]{24})', check, getMyFollowers)

router.get('/myFollowing/:id([a-f0-9]{24})', check, getMyFollowing)

router.get('/search/:id', check, searchUsers)

router.get('/profile/:id([a-f0-9]{24})', check, userPostProfile)

router.post('/report/Post/:id([a-f0-9]{24})', check, report)

router.get('/notification/:id([a-f0-9]{24})', check, getAllNotification)

router.get('/getcount/:id([a-f0-9]{24})', check, NotificationCount)

router.post('/notificationRead/:id([a-f0-9]{24})', check, manageNotification)

router.post('/deletepost/:id([a-f0-9]{24})', check, deletepost)



/* ------------------------ Datas protected with jwt ------------------------ */

module.exports = router;
