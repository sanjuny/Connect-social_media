import axios from '../Axios/Axios'

export const postAdminLogin =(data) => axios.post('/admin/adminlogin', data)