import axios from "axios";

const USERAPI = axios.create({baseURL:"http://localhost:5000"})

export const Login = (data) => USERAPI.post('/login', data)

export const Signup = (data) => USERAPI.post('/signup', data)

export const VerifyOtp = (data) => USERAPI.post('/Verifyotp', data)


