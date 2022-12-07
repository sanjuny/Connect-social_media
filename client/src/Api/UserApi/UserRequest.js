import Userinstance from '../../Axios/AxiosUserAuth'
import axios from '../../Axios/AxiosUserAuth'

export const Signup = (data)=> axios.post('/signup',data)
export const Login = (data)=> axios.post('/login',data)
export const VerifyOtp = (data) => axios.post('/Verifyotp',data)



export const addpost = (data) => Userinstance.post('/addpost',data)

export const getpost =() => Userinstance.get(`/getpost`)

export const addlike = (userId,postId) => Userinstance.post(`/addlike/${postId}`,{userId:userId})

export const addcomment = (data,postId) => Userinstance.post(`/addcomment/${postId}`,  {data})

export const getcomments = () => Userinstance.get(`/getcomment/`)