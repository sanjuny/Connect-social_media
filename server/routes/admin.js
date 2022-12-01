var express = require('express');
var router = express.Router();

const { getUserMangement, BlockUser, UnBlockUser, postAdminLogin, getUserById } = require('../Controller/Admincontroller');

router.get('/getusers', getUserMangement)
router.post('/userBlock', BlockUser)
router.post('/userUnBlock', UnBlockUser)
router.post('/adminlogin', postAdminLogin)


module.exports = router;
