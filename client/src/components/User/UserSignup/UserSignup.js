import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router';
import { Signup } from '../../../Api/UserRequest';
import image from '../../../Images/logowhite.png'

function UserSignup() {

  const navigate = useNavigate()

  const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = async (UserRequest) => {
    try {
      const { data } = await Signup(UserRequest)
      console.log(data,'lkjhg')
      navigate('/login')
    } catch (error) {
      console.log(error, 'error');
    }
  }

  return (
    <body>
      <section class="min-h-screen flex items-stretch text-white ">
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
                <input class=" border-b border-b-white focus:outline-none block w-full p-4 text-lg rounded-sm bg-black"
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Name"
                  {...register("name", { required: true })} />
                <error className='text-red-600'>
                  {errors.name?.type === "required" && "Name is required"}
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
                  {...register("number", { required: true, minLength: 10, maxLength: 10 })} />
                <error className='text-red-600'>
                  {errors.phone?.type === "required" && "phone is required"}
                  {errors.number?.type === "minLength" && "Entered number is less than 10 digits "}
                  {errors.number?.type === "maxLength" && "Entered number is more than 10 digits "}
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
              </div>

              <div class="pb-2 pt-4  mb-2">
                <input
                  type="text"
                  name="confirmpassword"
                  id="confirm Password"
                  placeholder="Confirm Password"
                  class=" border-b border-b-white focus:outline-none block w-full p-4 text-lg rounded-sm bg-black"
                  {...register("confirmpassword", { required: true })} />
                <error className='text-red-600'>
                  {errors.confirmpassword?.type === "required" && "confrim password is also required"}
                </error>
              </div>
              <div class="px-4 pb-2 pt-4 ">
                <button class="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">sign up</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </body>
  )
}

export default UserSignup