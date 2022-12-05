import React from 'react'
import image from '../../../Images/messi.jpg'

function RightBar() {
  return (
    <div className="w-2/5 h-12 position-relative">
      <div style={{ maxWidth: '350px' }}>
        <div className="overflow-y-auto fixed  h-screen">
          <div className="max-w-sm rounded-lg  bg-dim-700 overflow-hidden shadow-lg m-4">
            <div className="flex">
              <div className="flex-1 m-2">
                <h2 className="px-4 py-2 text-xl w-48 font-semibold text-white">Who to follow
                </h2>
              </div>
            </div>
            <hr className="border-gray-800" />
            <div className="flex flex-shrink-0">
              <div className="flex-1 ">
                <div className="flex items-center w-48">
                  <div>
                    <img className="inline-block h-10 w-auto rounded-full ml-4 mt-2"
                      src={image}
                      alt="" />
                  </div>
                  <div className="ml-3 mt-3">
                    <p className="text-base leading-6 font-medium text-white">
                      Lionel Messi
                    </p>
                    <p
                      className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      @leo_messi
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a href="" className="float-right">
                  <button
                    className="bg-transparent hover:bg-gray-800 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full">
                    Follow
                  </button>
                </a>
              </div>
            </div>
            <hr className="border-gray-800" />
            <div className="flex flex-shrink-0">
              <div className="flex-1 ">
                <div className="flex items-center w-48">
                  <div>
                    <img className="inline-block h-10 w-auto rounded-full ml-4 mt-2"
                      src={image}
                      alt="" />
                  </div>
                  <div className="ml-3 mt-3">
                    <p className="text-base leading-6 font-medium text-white">
                      Lionel Messi
                    </p>
                    <p
                      className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      @leo_messi
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a href="" className=" float-right">
                  <button
                    className="bg-transparent hover:bg-gray-800 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full">
                    Follow
                  </button>
                </a>
              </div>
            </div>
            <hr className="border-gray-800" />
            <div className="flex flex-shrink-0">
              <div className="flex-1 ">
                <div className="flex items-center w-48">
                  <div>
                    <img className="inline-block h-10 w-auto rounded-full ml-4 mt-2"
                      src={image}
                      alt="" />
                  </div>
                  <div className="ml-3 mt-3">
                    <p className="text-base leading-6 font-medium text-white">
                      Lionel Messi
                    </p>
                    <p
                      className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      @leo_messi
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a href="/home" className=" float-right">
                  <button
                    className="bg-transparent hover:bg-gray-800 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full">
                    Follow
                  </button>
                </a>
              </div>
            </div>

            <hr className="border-gray-800" />

            <div className="flex flex-shrink-0">
              <div className="flex-1 ">
                <div className="flex items-center w-48">
                  <div>
                    <img className="inline-block h-10 w-auto rounded-full ml-4 mt-2"
                      src={image}
                      alt="" />
                  </div>
                  <div className="ml-3 mt-3">
                    <p className="text-base leading-6 font-medium text-white">
                      Lionel Messi
                    </p>
                    <p
                      className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                      @leo_messi
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 px-4 py-2 m-2">
                <a href="/home" className=" float-right">
                  <button
                    className="bg-transparent hover:bg-gray-800 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full">
                    Follow
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}

export default RightBar