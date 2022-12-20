const mongoose = require('mongoose')
const users = require('./SignupSchema')

const NotificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref:users
    },
    Notification: [{
        user: {
            type: String,
            ref:users
        },
        desc: {
            type: String
        },
        time: {
            type: Date
        },
        unRead: {
            type: String
        }
    }]

})


const Notification = mongoose.model('Notification', NotificationSchema)
module.exports = Notification