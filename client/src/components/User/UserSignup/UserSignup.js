import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router';
import { Signup, VerifyOtp } from '../../../Api/UserApi/UserRequest';
import image from '../../../Images/logowhite.png'
import OTPInput, { ResendOTP } from "otp-input-react";
import { Link } from 'react-router-dom'


function UserSignup() {

  const navigate = useNavigate()

  const { register, formState: { errors }, handleSubmit } = useForm();

  const [err, seterr] = useState('')
  const [open, setOpen] = useState(false)
  const [OTP, setOTP] = useState('')
  const [OtpError, setOtpError] = useState('')
  const [UserDetails, setUserDetails] = useState('')

  const onSubmit = async (UserRequest) => {
    try {
      const { data } = await Signup(UserRequest)
      if (data.auth) {
        setUserDetails(data)
        setOpen(true)
      } else {
        seterr(data.message)
      }
    } catch (error) {
      console.log(error, 'error');
    }
  }



  const onVerify = async (e) => {
    e.preventDefault()
    const data = {
      OTP: OTP,
      user: UserDetails.data._id
    }
    if (OTP.length < 6) {
      setOtpError('Enter A 6 digit Otp')
    } else {
      const det = await VerifyOtp(data)
      if (det.data.verified) {
        navigate('/login')
      } else {
        setOtpError(det.data.msg)
      }
    }
  }


  const closeMODAl=()=>{
    setOpen(false)
  }

  return (
    <>
      <body>
        <section class="min-h-screen w-full flex items-stretch text-white absolute">
          <div class="lg:flex w-1/2 bg-black bg-no-repeat bg-cover relative flex justify-center items-center">
            <div class="absolute opacity-60 inset-0 z-0"></div>
            <div>
              <img src={image} style={{ height: '200px' }}></img>
            </div>
          </div>
          <div class="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" style={{ backgroundColor: "black" }} >
            <div class="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"  >
              <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
            </div>
            <div class="w-full py-6 z-20">
              <p class="text-gray-100 text-3xl ">
                SIGNUP FORM
              </p>
              <br />
              <form class="sm:w-2/3 w-full px-4 lg:px-0 mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div class="pb-2 pt-4  mb-2">
                  {err && <div className=" w-98 px p-2 mb-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {err}</div>}
                  <input class=" border-b border-b-white focus:outline-none block w-full p-4 text-lg rounded-sm bg-black"
                    type="username"
                    name="username"
                    id="username"
                    placeholder="Username"
                    {...register("username", { required: true, pattern: /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/ })} />
                  <error className='text-red-600'>
                    {errors.username?.type === "required" && "Username is required"}
                    {errors.username?.type === "pattern" && "Username is invalid"}
                  </error>
                </div>
                <div class="pb-2 pt-4  mb-2">
                  {err && <div className=" w-98 px p-2 mb-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {err}</div>}
                  <input class=" border-b border-b-white focus:outline-none block w-full p-4 text-lg rounded-sm bg-black"
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Name"
                    {...register("name", { required: true, pattern: /^[a-zA-z]+\s{1}[a-zA-z]*$/ })} />
                  <error className='text-red-600'>
                    {errors.name?.type === "required" && "Name is required"}
                    {errors.name?.type === "pattern" && "Name is invalid"}
                  </error>
                </div>
                <div class="pb-2 pt-4  mb-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    class=" border-b border-b-white focus:outline-none block w-full p-4 text-lg rounded-smborder-4 bg-black "
                    {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} />
                  <error className='text-red-600'>
                    {errors.email?.type === "required" && "Email is required"}
                    {errors.email?.type === "pattern" && "Email is invalid"}
                  </error>
                </div>
                <div class="pb-2 pt-4   mb-2">
                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    class=" border-b border-b-white focus:outline-none block w-full p-4 text-lg rounded-sm bg-black"
                    {...register("phone", { required: true, minLength: 10, maxLength: 10 })} />
                  <error className='text-red-600'>
                    {errors.phone?.type === "required" && "phone is required"}
                    {errors.phone?.type === "minLength" && "Entered number is less than 10 digits "}
                    {errors.phone?.type === "maxLength" && "Entered number is more than 10 digits "}
                  </error>
                </div>
                <div class="pb-2  pt-4  mb-2">
                  <input
                    type="text"
                    name="password"
                    id="password"
                    placeholder="Password"
                    class=" border-b border-b-white focus:outline-none block w-full p-4 text-lg rounded-sm bg-black"
                    {...register("password", { required: true, minLength: 8, maxLength: 15 })} />
                  <error className='text-red-600'>
                    {errors.password?.type === "required" && "password is required"}
                    {errors.password?.type === "minLength" && "Password must be more than 8 characters"}
                    {errors.password?.type === "maxLength" && "Password cannot exceed more than 15 characters"}
                  </error>
                  <div class=" mt-3 text-gray-400 hover:underline hover:text-gray-100">
                    Already have an account?
                    <Link to='/login' class="text-blue-600 hover:underline">
                      login here
                    </Link>
                  </div>
                </div>
                <div class="px-4 pb-2 pt-4 ">
                  <button class="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">sign up</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </body>

      {/* otp modal */}

      {
        open ? (
          <div class="relative flex min-h-screen flex-col justify-center overflow-hidden">
            <div class="relative bg-gradient-to-r from-gray-900 bg-gray-600 px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
              <button onClick={closeMODAl} type="button" class="float-right bg-whit rounded-md p-2 inline-flex items-center justify-center text-black hover:text-black hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                <span class="sr-only">Close menu</span>
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                <div class="flex flex-col items-center justify-center text-center space-y-2">
                  <div class="font-semibold text-3xl text-white">
                    <p>Email Verification</p>
                  </div>
                </div>
                <div>
                  <p className='text-red-500 font-[8px] mb-3 pl-3 text-center'>{OtpError}</p>
                  <form action="" method="post">
                    <div class="flex flex-col space-y-16">
                      <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                        <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} />
                      </div>
                      <div class="flex flex-col space-y-5">
                        <div>
                          <button onClick={(e) => onVerify(e)} class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                            Verify Account
                          </button>
                        </div>
                        <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-white">
                          <p>Didn't recieve code?</p> <a class="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : null
      }
    </>
  )
}

export default UserSignup