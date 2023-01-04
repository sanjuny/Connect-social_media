import axios from "axios";

const USERAPI = axios.create({ baseURL: "http://localhost:5000/api" })

export const Login = (data) => USERAPI.post('/login', data)

export const Signup = (data) => USERAPI.post('/signup', data)

export const VerifyOtp = (data) => USERAPI.post('/Verifyotp', data)

export const resendOTPP = (data) => USERAPI.post('/resendotp', data)


