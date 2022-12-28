import React from 'react'
import Chat from '../../components/User/Chat/Chat'
import LeftBar from '../../components/User/LeftBar/LeftBar'

function ChatPage() {
    return (
        <>
            <div className='bg-[#000000] '>
                <div className='flex  max-w-[100%]'>
                    <div className='md:w-3/12 pl-20 hidden lg:block max-w-[100%] '>
                        <LeftBar />
                    </div>
                    <div className='w-full md:w-9/12  flex-row justify-center max-w-[100%]'>
                        <Chat />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage