import React from 'react'
import { Link } from 'react-router-dom'
import image from '../../../Images/logowhite.png'

function UserLanding() {
  return (

    <div>
      <div className="relative min-h-screen  grid bg-black ">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
          <div className="landing relative sm:w-1/2 xl:w-3/5 bg-white-500 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden  text-white bg-no-repeat bg-cover" >
            <div className="absolute bg-black  opacity-25 inset-0 z-0"></div>
            <div className="w-full  lg:max-w-2xl md:max-w-md z-10 items-center text-center ">
              <div className=" font-bold leading-tight mb-6 mx-auto w-full content-center flex justify-center items-center ">
                <div>
                  <img src={image} style={{ height: '200px' }}></img>
                </div>

              </div>
            </div>
          </div>
          <div
            className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none "
          >
            <div className="max-w-xl w-full space-y-12">
              <div className="lg:text-left text-center">
                <h2 className="mt-6 text-3xl font-bold text-gray-100">
                  "People are never too young or too old to look for human connection"
                </h2>
                <h2 className="mt-6 text-5xl font-bold text-gray-100">
                  Happy Connect...
                </h2>
              </div>
              <div className="flex flex-row justify-center items-center space-x-3"></div>

              <div>
                <Link to='/signup'><button
                  type="submit"
                  className="lg:w-3/5 w-full flex justify-center text-gray-100 p-4   rounded-full tracking-wide font-bold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg bg-indigo-600 cursor-pointer transition ease-in duration-300"
                >
                  Sign up
                </button></Link>
              </div>
              <div>
                <Link to="/login"><button
                  type="submit"
                  className="lg:w-3/5 w-full flex justify-center border-indigo-600 bg-transparent text-gray-100 p-4 border rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-gray-900 shadow-lg cursor-pointer transition ease-in duration-300"
                >
                  Log in
                </button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLanding