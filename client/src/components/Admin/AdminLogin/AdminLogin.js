import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router';
import { postAdminLogin } from '../../../Api/AdminApi/AdminLogin';
import image from '../../../Images/logoblack.png'

function AdminLogin() {

  const { register, formState: { errors }, handleSubmit } = useForm();

  const navigate = useNavigate()

  const [errorMsg, seterrorMsg] = useState('')


  const onSubmit = async (loginrequest) => {
    console.log('koko');
    try {
      const { data } = await postAdminLogin (loginrequest)
      console.log(data, 'hello');
      if (data.auth) {
        localStorage.setItem('AdminToken', data.token)
        navigate('/usermanagement')
      } else {
        seterrorMsg(data.message)
        console.log('something went wrong');
      }
    } catch (error) {
      // seterrorMsg(error.message)
      console.log(error, 'errorADMIN');

    }
  }


  return (

    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-800 bg-gray-500">
      <div className="w-96 flex-col border bg-white px-6 py-14 shadow-md rounded-[4px] ">
        <div className="mb-8 flex justify-center">
          <img src={image} style={{ height: '50px' }}></img>
        </div>
        {errorMsg && <div className="p-2 mb-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {errorMsg}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col text-sm rounded-md">
            <input className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 "
              type="email"
              name="email"
              id='email'
              placeholder="Email id"
              {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}
               />
            <error className='text-red-600'>
              {errors.email?.type === "required" && "Email is required"}
              {errors.email?.type === "pattern" && "Email is invalid"}
            </error>
          </div>
          <div className="flex flex-col text-sm rounded-md">
          <input className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 "
              type="password"
              name="password"
              id='password'
              placeholder="password"
              {...register("password", { required: true })} 
              />
            <error className='text-red-600'>
              {errors.password?.type === "required" && "password is required"}
            </error>
          </div>
          <button className="mt-5 w-full border p-2 bg-gradient-to-r from-gray-800 bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300">Sign in</button>
        </form>
        <div className="mt-5 flex justify-between text-sm text-gray-600">
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin