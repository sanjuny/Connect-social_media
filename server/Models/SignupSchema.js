const mongoose = require('mongoose')
const { array } = require('../helpers/Multer')

const SignupSchema = mongoose.Schema({
    username: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
        require: true
    },
    password: {
        type: String,
    },
    verified: {
        type: String,
        default: "Not Verified"
    },
    status: {
        type: String,
        default: "active"
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    image:{
        type: String,
        default:null
    },
    coverPic:{
        type:String,
        default:null
    },
    bio:{
        type:String,
        default:null
    }
})

const users = mongoose.model('users', SignupSchema)

module.exports = users