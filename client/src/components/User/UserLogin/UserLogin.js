import { useForm } from 'react-hook-form'
import image from '../../../Images/logowhite.png'
import { Login } from '../../../Api/UserApi/UserRequest';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Userlogin() {

  const navigate = useNavigate()

  const { register, formState: { errors }, handleSubmit } = useForm();

  const [ err, seterr ] = useState('')

  const onSubmit = async (UserRequest) => {
    try {
      const { data } = await Login(UserRequest)
      console.log(data, 'kkk');
      if (data.auth) {
        localStorage.setItem('userToken', data.token)
        localStorage.setItem('user', JSON.stringify(data.users))
        navigate('/home')
      } else {
        seterr(data.message)
        console.log("getting");
        console.log(data.message);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  }

  return (
    <body>
      <section className="min-h-screen flex items-stretch text-white ">
        <div className="lg:flex w-1/2 bg-black bg-no-repeat bg-cover relative flex justify-center items-center">
          <div className="absolute bg-blackk opacity-60 inset-0 z-0"></div>
          <div>
            <img src={image} style={{ height: '200px' }}></img>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" style={{ backgroundColor: "black" }} >
          <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"  >
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            <div className='flex justify-center'>
              <img src={image} style={{ height: '50px' }}></img>
            </div>

            <div className="py-6 space-x-2">
              <span className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white">f</span>
              <span className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white">G+</span>
              <span className="w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white">in</span>
            </div>
            <p className="text-gray-100">
              or sign in with email
            </p>
            <form className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto" onSubmit={handleSubmit(onSubmit)}>
              <div className="pb-2 pt-4">
            {err && <div className=" w-98 px p-2 mb-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {err}</div>}
                <input className="border-b border-b-white focus:outline-none block w-full p-4 text-lg rounded-sm bg-black"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})} />
                <error className='text-red-600'>
                  {errors.email?.type === "required" && "Email is required"}
                  {errors.email?.type === "pattern" && "Email is invalid"}
                </error>
              </div>
              <div className="pb-2 pt-4">
                <input className="border-b border-b-white focus:outline-none block w-full p-4 text-lg rounded-sm bg-black"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  {...register("password", { required: true, minLength: 8, maxLength: 15 })} />
                <error className='text-red-600'>
                  {errors.password?.type === "required" && "password is required"}
                  {errors.password?.type === "minLength" && "Password must be more than 8 characters"}
                  {errors.password?.type === "maxLength" && "Password cannot exceed more than 15 characters"}
                  
                </error>
              </div>
              <div className=" text-gray-400 hover:underline hover:text-gray-100 flex justify-between">
                Forgot your password?
                <Link to='/signup'>
                Dont have an account?SignUp
                </Link>
              </div>
              <div className="px-4 pb-2 pt-4">
                <button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">sign in</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </body>

  )
}

export default Userlogin