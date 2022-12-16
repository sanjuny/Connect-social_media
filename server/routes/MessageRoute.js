var express = require('express')
var router = express.Router()
const { addMessage, getMessages } = require('../Controller/MessageController')

const check = require('../Middleware/AuthMiddleware')

/* ------------------------ Datas protected with jwt ------------------------ */

router.post('/', check, addMessage)

router.get('/:chatId', check, getMessages)

/* ------------------------ Datas protected with jwt ------------------------ */

module.exports = router