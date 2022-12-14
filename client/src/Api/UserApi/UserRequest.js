
import axios from '../../Axios/AxiosUserAuth'


export const Signup = (data)=> axios.post('/signup',data)
export const Login = (data)=> axios.post('/login',data)
export const VerifyOtp = (data) => axios.post('/Verifyotp',data)



export const addpost = (data) => axios.post('/addNewPost',data)

export const getpost = (userId) => axios.get(`/getpost/${userId}`)

export const addlike = (userId,postId) => axios.post(`/addlike/${postId}`,{userId:userId})

export const addcomment = (data,postId) => axios.post(`/addcomment/${postId}`,  {data})

export const getcomments = (postId) => axios.get(`/getcomment/${postId}`)

export const getSuggestionUser = () => axios.get('/getsuggestion')

export const addfollow = (currentUserId,id) => axios.post(`/addfollow/${currentUserId}`,{id:id})

export const getProfilePost = (userId) => axios.get(`/getprofilepost/${userId}`)

export const editProfile = (data,userId) => axios.post(`/geteditProfile/${userId}`,{data})

export const userChats = (id) => axios.get(`/chat/${id}`)

export const getUser = (userId) => axios.get(`/getUser/${userId}`)

export const getMessages = (id) => axios.get(`/message/${id}`)




