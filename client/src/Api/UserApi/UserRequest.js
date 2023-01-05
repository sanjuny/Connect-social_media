import axios from "axios"
import instance from "../../Axios/AxiosUserAuth"

export const addpost = (data) => axios.post('https://connectgram.website/api/addNewPost', data)

export const getpost = (userId) => instance.get(`/getpost/${userId}`)

export const addlike = (userId, postId) => instance.post(`/addlike/${postId}`, { userId: userId })

export const addcomment = (data, postId) => instance.post(`/addcomment/${postId}`, { data })

export const getcomments = (postId) => instance.get(`/getcomment/${postId}`)

export const getSuggestionUser = () => instance.get('/getsuggestion')

export const addfollow = (currentUserId, id) => instance.post(`/addfollow/${currentUserId}`, { id: id })

export const getProfilePost = (userId) => instance.get(`/getprofilepost/${userId}`)

export const userChats = (id) => instance.get(`/chat/${id}`)

export const getUser = (userId) => instance.get(`/getUser/${userId}`)

export const getMessages = (id) => instance.get(`/message/${id}`)

export const addMessage = (data) => instance.post(`/message/`, data)

export const getUserByUsername = (username) => instance.get(`/users?username=${username}`)

export const getUserFollowers = (userId) => instance.get(`/myFollowers/${userId}`)

export const getUserFollowing = (userId) => instance.get(`/myFollowing/${userId}`)

export const findSearch = (data) => instance.get(`/search/${data}`)

export const userPost = (userId) => instance.get(`/profile/${userId}`)

export const createChat = (users) => instance.post(`/chat`, users)

export const reportPost = (userId, reportValue, postId) => instance.post(`/report/Post/${postId}`, { userId, reportValue })

export const getAllNotification = (userId) => instance.get(`/notification/${userId}`)

export const fetchNoCounts = (userId) => instance.get(`/getcount/${userId}`)

export const editphoto = (data) => axios.post(`https://connectgram.website/api/photo`, data)

export const updateDetails = (data, userId) => { instance.post(`/updatedetails/${userId}`, { data }) }

export const notificationManage = (userId) => instance.post(`/notificationRead/${userId}`)

export const deletepost = (postId) => instance.post(`/deletepost/${postId}`)



