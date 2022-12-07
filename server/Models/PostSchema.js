const mongoose = require ('mongoose')
const { array } = require('../helpers/Multer')
 
const PostSchema = mongoose.Schema({
    userId:{
        type:String
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