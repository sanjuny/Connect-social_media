import axios from '../Axios/Axios'

export const Signup = (data)=> axios.post('/signup',data)
export const Login = (data)=> axios.post('/login',data)
