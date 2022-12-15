const mongoose = require('mongoose')

const uri = "mongodb+srv://sanjuny07:sanju123@cluster0.pxhkkxr.mongodb.net/Connect?retryWrites=true&w=majority";

const connectDB = async()=>{
    try {
        await mongoose.connect(uri,{
            useNewUrlParser:true,
        },()=>{
            console.log('MongoDB connected!');
        })
    } catch (error) {
        console.log('Error in connection of DB');
    }

}

module.exports={connectDB} 