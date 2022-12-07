const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    postId:{
        type:String,
        required:[true]
    },
    userId:{
        type:String
    },
    comment:{
        type:String
    }
},{timestamps:true})

const Comment = mongoose.model('CommentSchema',CommentSchema)

module.exports = Comment