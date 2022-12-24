var express = require('express');
var router = express.Router();

const { getUserMangement, BlockUser, UnBlockUser, postAdminLogin, getreportPosts, getreportDetails, BlockreportPost } = require('../Controller/Admincontroller');

const check = require('../Middleware/AuthMiddleware');

router.post('/adminlogin', postAdminLogin)

/* ------------------------ Datas protected with jwt ------------------------ */

router.get('/getusers', check, getUserMangement)

router.post('/userBlock', check, BlockUser)

router.post('/userUnBlock', check, UnBlockUser)

router.get('/reportedpost', check, getreportPosts)

router.get('/reportdetails/:id', check, getreportDetails)

router.post('/blockpost/:id', check, BlockreportPost)

/* ------------------------ Datas protected with jwt ------------------------ */


module.exports = router;
