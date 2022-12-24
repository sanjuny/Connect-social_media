import instance from '../../Axios/AxiosAdminAuth';

export const getusers = () => instance.get('/getusers')

export const userBlock = (blockdata) => instance.post('/userBlock',{userId:blockdata})

export const userUnBlock = (unblockdata) => instance.post('/userUnBlock',{userId:unblockdata})

export const fetchReportedPost = () => instance.get('/reportedpost')

export const getReportDetails = (postId) => instance.get(`/reportdetails/${postId}`)

export const blockUserpost = (postId) => instance.post(`/blockpost/${postId}`)