const users = require('../Models/SignupSchema')


const postSignup = async (req, res) => {
    try {
        let { name, email, phone, password, confirmpassword } = req.body;
        const userExist = await users.findOne({email})
        if(userExist){
            res.status(400)
            throw new Error('user already exist with this email id')
        }else{
           users.create({
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

postLogin = ( req, res) =>{
    try {
        let { email, password } = req.body
        

    } catch (error) {
        
    }
}

module.exports = {postSignup}