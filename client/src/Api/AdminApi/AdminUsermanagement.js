import instance from '../../Axios/AxiosAdminAuth';

export const getusers = () => instance.get('/getusers')
export const userBlock = (blockdata) => instance.post('/userBlock',{userId:blockdata})
export const userUnBlock = (unblockdata) => instance.post('/userUnBlock',{userId:unblockdata})
