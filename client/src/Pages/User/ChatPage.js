import React from 'react'
import Chat from '../../components/User/Chat/Chat'
import ChatRight from '../../components/User/ChatRight/ChatRight'
import LeftBar from '../../components/User/LeftBar/LeftBar'

function ChatPage() {
    return (
        <>
            <div className='bg-[#000000] container max-h-screen overflow-y-hidden'>
                <div className='flex  max-w-[100%]'>
                    <div className='container w-3/12 p-5 pl-20 hidden md:block max-w-[100%] '>
                        <LeftBar />
                    </div>
                    <div className='container w-5/12 p-5  flex-row justify-center max-w-[100%]'>
                        <Chat />
                    </div>
                    <div className='container w-14/12 p-5 pr-20 hidden md:block max-w-[100%]  ' >
                       <ChatRight />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage