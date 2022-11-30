import axios from '../Axios/Axios';

export const getusers = () => axios.get('/admin/getusers')
export const userBlock = (blockdata) => axios.post('/admin/userBlock',{userId:blockdata})
export const userUnBlock = (unblockdata) => axios.post('/admin/userUnBlock',{userId:unblockdata})