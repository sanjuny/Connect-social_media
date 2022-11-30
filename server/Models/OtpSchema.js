const mongoose = require ('mongoose')

const OtpSchema = mongoose.Schema({
    userId:{
        type:String
    },
    Otp:{
        type:String
    },
    Created:{
        type:Date
    },
    Expiry:{
        type:Date
    }

})

const OtpVerification =  mongoose.model('OtpVerification',OtpSchema)

module.exports = OtpVerification