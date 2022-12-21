const { response } = require("../app");
const users = require("../Models/SignupSchema")
const jwt = require('jsonwebtoken')


const getUserMangement = (req,res)=>{
    console.log('getUserMangement');
    try {
            users.find().then((response)=>{
            console.log(response,'response');
            res.status(200).json(response)
        })
    } catch (error) {
        res.status(401).json({message:'Something went wrong! Try again'})
        console.log(error,'ertyuioiuytr');
        
    }

}


const BlockUser = (req,res)=>{
    console.log('BlockUser');
    try {
        users.findByIdAndUpdate(req.body.userId,
            {
                $set:{status: 'inactive'}

            }).then((response)=>{
                res.status(200).json({update:true,message:"User has been Blocked!"})
            }).catch((error)=>{
                res.status(200).json({update:false,message:"User not Blocked!"})
                console.log(error,'catching block error');
            })
            console.log(req.body,'tyuiuytdfghj');
        
    } catch (error) {
        res.json(error.message)
    }
}

const UnBlockUser = (req,res)=>{
    console.log('unblock');
    try {
        users.findByIdAndUpdate(req.body.userId,
            {
                $set:{status:'active'}
            }).then((response)=>{
                res.status(200).json({update:true,message:"User has been UnBlocked!"})
            }).catch(error=>{
                res.status(401).json({message:"something went wrong"})
                console.log(error,'catching unblock error');
            })  
    } catch (error) {
        res.json(error.message)
        
    }
}


const postAdminLogin = async (req, res)=>{
    console.log('callll');
    try {
        const adminMail = process.env.ADMIN_NAME
        const adminPass = process.env.ADMIN_PASS
        console.log(req.body, 'jjjjj');
        console.log(adminMail,'poiugfd');
        console.log(req.body.email,'kjh');

        if(adminMail == req.body.email){
            console.log("email ok");
            if(adminPass == req.body.password){
                const id = '3sedyrf678a'
                console.log("pass ok");
                const token = jwt.sign({id}, process.env.JWT_SECERT,{
                    expiresIn:'365d',
                })
                console.log('kk');
                res.status(200).json({auth: true, token: token});
            }else{
                res.json('Incorrect Password')
            }
        }else{
            res.json({message:'Email is not valid no details found'})
        }
        
    } catch (error) {
        
    }
}







module.exports={ getUserMangement, BlockUser, UnBlockUser, postAdminLogin }

