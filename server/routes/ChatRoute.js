var express = require('express')
var router = express.Router()
const { createChat, userChats, findChat } = require('../Controller/ChatConroller')

const check = require('../Middleware/AuthMiddleware')

/* ------------------------ Datas protected with jwt ------------------------ */

router.post('/', check, createChat)

router.get('/:userId', check, userChats)

router.get('/find/:firstId/:secondId', check, findChat)

/* ------------------------ Datas protected with jwt ------------------------ */


module.exports = router