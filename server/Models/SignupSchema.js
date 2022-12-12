const mongoose = require('mongoose')
const { array } = require('../helpers/Multer')

const SignupSchema = mongoose.Schema({
    username: {
        type: String,
    },
    name: {
        type: String,
        // required:[true, 'Name is required']
    },
    email: {
        type: String,
        // validate:[emailValidation, "invalid mail"],
        // required:[true, "Email is required"],
        // unique:true
    },
    phone: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        // required:[true, "Password is required"],
        // max:[10, "password does not exceed more than 10"]
    },
    verified: {
        type: String,
        default: "Not Verified"
        // required:[true, "Password is required"],
        // max:[10, "password does not exceed more than 10"]
    },
    status: {
        type: String,
        default: "active"
    },
    followers:{
        type: Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    }
})

const users = mongoose.model('users', SignupSchema)

module.exports = users