import axios from  'axios'

const API = axios.create({baseURL:"http://connectgram.website/api/admin"})

export const postAdminLogin =(data) => API.post('/adminlogin', data)