import instance from "../../Axios/AxiosUserAuth"

export const addpost = (data) => instance.post('/addNewPost',data)

export const getpost = (userId) => instance.get(`/getpost/${userId}`)

export const addlike = (userId,postId) => instance.post(`/addlike/${postId}`,{userId:userId})

export const addcomment = (data,postId) => instance.post(`/addcomment/${postId}`,  {data})

export const getcomments = (postId) => instance.get(`/getcomment/${postId}`)

export const getSuggestionUser = () => instance.get('/getsuggestion')

export const addfollow = (currentUserId,id) => instance.post(`/addfollow/${currentUserId}`,{id:id})

export const getProfilePost = (userId) => instance.get(`/getprofilepost/${userId}`)

export const editProfile = (data,userId) => instance.post(`/geteditProfile/${userId}`,{data})

export const userChats = (id) => instance.get(`/chat/${id}`)

export const getUser = (userId) => instance.get(`/getUser/${userId}`)

export const getMessages = (id) => instance.get(`/message/${id}`)

export const addMessage = (data) => instance.post(`/message/`,data)

export const getUserByUsername = (username) => instance.get(`/users?username=${username}`)

export const getUserFollowers = (userId) => instance.get(`/myFollowers/${userId}`)

export const getUserFollowing = (userId) => instance.get(`/myFollowing/${userId}`)




