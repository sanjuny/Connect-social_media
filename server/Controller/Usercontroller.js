const Users = require('../Models/SignupSchema')
const jwt = require('jsonwebtoken')

const postSignup = async (req, res) => {
    try {
        let { name, email, phone, password, confirmpassword } = req.body;
        const userExist = await Users.findOne({email})
        if(userExist){
            res.status(400)
            throw new Error('user already exist with this email id')
        }else{
           Users.create({
                name,
                email,
                phone,
                password,
                confirmpassword    
            }).then((response) => {
                res.json('hello')
            })
            console.log(req.body);
        }
    } catch (error) {
        res.json('something went wrong')
    }

}

const postLogin = async( req, res) =>{
    console.log('calll');
    try {
        // let { email, password } = req.body
        console.log(req.body,'reqbfcssody')
        const users = await Users.findOne({email:req.body.email})
        console.log(users,'jjjj');
        if(users){
            const id = users._id
            if(users.password === req.body.password){
                console.log('kkkkkkkkkk');
                const token = jwt.sign({id}, process.env.JWT_SECERT,{
                    expiresIn:300,
                })
                console.log('fffffffffff');
                res.status(200).json({auth: true, token: token, users: users})
            }else{   
                console.log('uuuuuuuuuuuuuu');
                res.status(200).json({message:'password doesnt exist'})
            }   
        }else{
            console.log('mmmmmmmm');
            res.status(200).json({message:'user doesnt exist'})
        }
    } catch (error) {
        console.log('ggggg');
        console.log(error);
        res.status(500).json(error)      
    }
}

module.exports = {postSignup, postLogin}