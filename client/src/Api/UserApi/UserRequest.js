import axios from '../../Axios/AxiosUserAuth'

export const Signup = (data)=> axios.post('/signup',data)
export const Login = (data)=> axios.post('/login',data)
export const VerifyOtp = (data) => axios.post('/Verifyotp',data)
