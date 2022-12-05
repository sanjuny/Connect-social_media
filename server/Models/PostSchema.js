const mongoose = require ('mongoose')
 
const PostSchema = mongoose.Schema({
    userId:{
        type:String
    },
    Image:{
        type:String
    },
    Created:{
        type:Date
    },
    Description:{
        type:String
    }

})

const Post = mongoose.model('PostSchema',PostSchema)

module.exports = Post