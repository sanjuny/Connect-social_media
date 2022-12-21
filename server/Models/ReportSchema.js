const mongoose = require('mongoose')
const users = require('./SignupSchema')

const reportSchema = mongoose.Schema({
    postId:{
        type:String,
        require:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: users,
        require:true
    },
    reason:{
        type:String,
        require:true
    }

},{timestamps:true})

const reported = mongoose.model('reportSchema',reportSchema)

module.exports = reported