const mongoose = require('mongoose')
// const users = require('./SignupSchema')

const CommentSchema = mongoose.Schema({
    postId:{
        type:String,
        required:[true]
    },
    userId:{
        type:String,
        ref:'users'
    },
    comment:{
        type:String
    }
},{timestamps:true})

const Comment = mongoose.model('CommentSchema',CommentSchema)

module.exports = Comment