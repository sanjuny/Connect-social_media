import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUser, userChats } from '../../../Api/UserApi/UserRequest';
import ChatRight from '../ChatRight/ChatRight';
import Conversation from '../Conversation/Conversation';


function Chat() {

    /* ---------------------------- current userdata ---------------------------- */
    const userData = useSelector(state => state.user)
    console.log(userData, 'userData');
    /* ---------------------------- current userdata ---------------------------- */

    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [userDatas, setUserDatas] = useState(null)

    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(userData._id)
                console.log(data, 'data');
                setChats(data)

            } catch (error) {
                console.log(error, 'catch error chat');
            }
        }
        getChats()
        if (currentChat) {
            getUserData()
        }
    }, [currentChat])

    const getUserData = async (userId) => {
        console.log('currentChat');
        console.log(currentChat);
        try {
            const { data } = await getUser(currentChat);
            console.log(" DATA ON RIGHT SIDE");
            console.log(data);
            setUserDatas(data)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex h-screen  antialiased text-gray-800">
                <div className="  h-full w-full overflow-x-hidden no-scrollbar">
                    <div className="w-9/4  border border-y-0 border-gray-800 h-full">
                        <div className="flex justify-start">
                            <div className="px-4 py-2 mx-2">
                            </div>
                            <div className="mx-2">
                                <h2 className="mb-5 text-xl font-bold text-white">Messages</h2>
                            </div>
                        </div>
                        <hr className="border-gray-800" />
                        <div className="flex flex-col py-8 pl-6 pr-2 w-full bg-black flex-shrink-0  h-full">
                            <div className="flex flex-col">
                                <div className="flex flex-row items-center justify-between text-xs">
                                    <span className="font-bold text-white">Active Conversations</span>
                                    <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span>
                                </div>
                                {chats.map((chat, index) => {
                                    return (
                                        <div className="flex flex-col space-y-1 mt-4 max-h-screen overflow-y-auto  no-scrollbar" key={index}>
                                            <button onClick={() => setCurrentChat(chat.members.find((id) => id !== userData._id))} className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2" >
                                                <div className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full"> M</div>
                                                <div className="ml-2 text-sm font-semibold text-white"> <Conversation data={chat} currentUserId={userData._id} /></div>
                                                <div className="flex items-center justify-center ml-auto text-xs text-white bg-red-500 h-4 w-4 rounded leading-none">2</div>
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <ChatRight chatUser={userDatas} currentUser={userData._id} />

            </div>
        </>
    )
}

export default Chat