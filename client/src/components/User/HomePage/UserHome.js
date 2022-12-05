import React from 'react'
import Feed from '../Feed/Feed'
import LeftBar from '../LeftBar/LeftBar'
import RightBar from '../RightBar/RightBar'




function UserHome() {
  return (
    <>
      <div className='bg-[#000000] container max-h-screen overflow-y-hidden'>
        <div className='flex  max-w-[100%]'>
          <div className='container w-4/12 p-5 pl-20 hidden md:block max-w-[100%] '>
            <LeftBar />
          </div>
          <div className='container md:w-7/12 p-5  flex-row justify-center max-w-[100%]'>
            <Feed />
          </div>
          <div className='container w-5/12 p-5 pr-20 hidden md:block max-w-[100%]  ' >
            <RightBar />
          </div>
        </div>
      </div>
    </>










  )
}

export default UserHome