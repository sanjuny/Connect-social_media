const { response } = require("../app");
const users = require("../Models/SignupSchema")
const Post = require("../Models/PostSchema");
const jwt = require('jsonwebtoken');
const reported = require("../Models/ReportSchema");


const getUserMangement = (req, res) => {
    try {
        users.find().then((response) => {
            res.status(200).json(response)
        })
    } catch (error) {
        res.status(401).json({ message: 'Something went wrong! Try again' })
    }

}


const BlockUser = (req, res) => {
    try {
        users.findByIdAndUpdate(req.body.userId,
            {
                $set: { status: 'inactive' }

            }).then((response) => {
                res.status(200).json({ update: true, message: "User has been Blocked!" })
            }).catch((error) => {
                res.status(200).json({ update: false, message: "User not Blocked!" })
            })
    } catch (error) {
        res.json(error.message)
    }
}

const UnBlockUser = (req, res) => {
    try {
        users.findByIdAndUpdate(req.body.userId,
            {
                $set: { status: 'active' }
            }).then((response) => {
                res.status(200).json({ update: true, message: "User has been UnBlocked!" })
            }).catch(error => {
                res.status(401).json({ message: "something went wrong" })
            })
    } catch (error) {
        res.json(error.message)

    }
}


const postAdminLogin = async (req, res) => {
    try {
        const adminMail = process.env.ADMIN_NAME
        const adminPass = process.env.ADMIN_PASS
        if (adminMail == req.body.email) {
            if (adminPass == req.body.password) {
                const id = '3sedyrf678a'
                const token = jwt.sign({ id }, process.env.JWT_SECERT, {
                    expiresIn: '365d',
                })
                res.status(200).json({ auth: true, token: token });
            } else {
                res.json('Incorrect Password')
            }
        } else {
            res.json({ message: 'Email is not valid no details found' })
        }

    } catch (error) {

    }
}


/* ---------------------------- get report posts ---------------------------- */

const getreportPosts = async (req, res) => {
    // let postId = req.params.id
    // let { userId, reason } = req.body
    // let data = await new reported({ postId: postId, userId: userId, reason: reason })
    try {
        const posts = await Post.find({ reports: { $ne: [] } })
        // let posts = await Post.findById(postId)
        // if (!posts?.reports?.includes(userId)) {
        //     await Post.updateOne({ $push: { reports: userId } })
        //     await data.save()
        // }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
}


/* ---------------------- get report details for modal ---------------------- */

const getreportDetails = async (req, res) => {
    try {
        const result = await reported.find({ postId: req.params.id }).populate('userId', 'username')
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
}


/* ---------------------------- block report post --------------------------- */

const BlockreportPost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, { $set: { status: 'inactive' } })
        const details = {
            user: post.userId,
            desc: 'Post has been blocked',
            time: Date.now()
        }
        res.status(200).json({ message: 'post Blocked!' })
    } catch (error) {
        res.status(500).json(error)
    }
}



const UnBlockreportPost = (req, res) => {
    try {
        Post.findByIdAndUpdate(req.params.id, {
            $set: { status: "active" }
        }).then(response => {
            res.status(200).json({ update: true, message: "post has been Ublocked" })
        }).catch(err => {
            res.status(401).json({ message: "Something went wrong" })
        })
    } catch (error) {
        res.status(500).json(error)
    }
}



module.exports = {
    getUserMangement,
    BlockUser,
    UnBlockUser,
    postAdminLogin,
    getreportPosts,
    getreportDetails,
    BlockreportPost,
    UnBlockreportPost
}

