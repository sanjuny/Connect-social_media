const mongoose = require ('mongoose')

const SignupSchema = mongoose.Schema({
    name:{
        type:String,
        // required:[true, 'Name is required']
    },

    email:{
        type:String,
        // validate:[emailValidation, "invalid mail"],
        // required:[true, "Email is required"],
        // unique:true
    },

    phone:{
        type:Number,
        // required:[true, "Phone Number is required"],
        // unique:true,
        // minlength:[10,"phone number should need 10"]
    },

    password:{
        type:String,
        // required:[true, "Password is required"],
        // max:[10, "password does not exceed more than 10"]
    },

    confirmpassword:{
        type:String,
        // required:[true, "Confirm Password is required"],
        // max:[10, "password does not exceed more than 10"]
    }
})

const users = mongoose.model('users',SignupSchema)

module.exports = users