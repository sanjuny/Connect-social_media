import React from 'react'
import LeftBar from '../../components/User/LeftBar/LeftBar'
import Menubar from '../../components/User/Menubar/Menubar'
import Notification from '../../components/User/Notification/Notification'
import RightBar from '../../components/User/RightBar/RightBar'

function NotificationPage() {
    return (
        <>
            <div className='bg-[#000000]  max-h-screen overflow-y-hidden'>
                <div className='md:hidden'>
                    <Menubar />
                </div>
                <div className='flex  max-w-[100%]'>
                    <div className='lg:w-4/12 p-5 pl-20 hidden md:block max-w-[100%] '>
                        <LeftBar />
                    </div>
                    <div className='w-full md:w-7/12 p-5  flex-row justify-center max-w-[100%]'>
                        <Notification />
                    </div>
                    <div className=' w-5/12 p-5 pr-20 hidden md:block max-w-[100%]  ' >
                        <RightBar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotificationPage