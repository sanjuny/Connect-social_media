var express = require('express');
var router = express.Router();

const { getUserMangement, BlockUser, UnBlockUser, postAdminLogin } = require('../Controller/Admincontroller');

const check = require('../Middleware/AuthMiddleware');

router.post('/adminlogin', postAdminLogin)

/* ------------------------ Datas protected with jwt ------------------------ */

router.get('/getusers', check, getUserMangement)
router.post('/userBlock', check, BlockUser)
router.post('/userUnBlock', check, UnBlockUser)

/* ------------------------ Datas protected with jwt ------------------------ */


module.exports = router;
