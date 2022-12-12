const mongoose = require ('mongoose')
const { array } = require('../helpers/Multer')
const users = require('./SignupSchema')
 
const PostSchema = new mongoose.Schema({
    userId:{
        type:String,
        ref: users
    },
    image:{
        type:String
    },
    description:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    }

},{timestamps:true})

const Post = mongoose.model('PostSchema',PostSchema)

module.exports = Post