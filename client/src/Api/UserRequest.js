import axios from '../Axios/Axios'

export const Signup = (data)=> axios.post('/signup',data)
