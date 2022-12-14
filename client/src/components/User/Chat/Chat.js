import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { createChat, getMessages, getUser, userChats } from '../../../Api/UserApi/UserRequest';
import ChatRight from '../ChatRight/ChatRight';
import Conversation from '../Conversation/Conversation';
import { socket } from '../../../UserContext/SocketContext';


function Chat() {

    /* ---------------------------- current userdata ---------------------------- */
    const userData = useSelector(state => state.user)
    const { AnotherUserId } = useSelector(state => state.anotheruser)
    /* ---------------------------- current userdata ---------------------------- */

    const [responsive, setResponsive] = useState(false)

    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [recieveMessage, setRecieveMessage] = useState(null)

    // send messgae to the socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.emit('send-message', sendMessage)
        }
    }, [sendMessage])


    useEffect(() => {
        if (AnotherUserId) {
            const users = {
                senderId: userData._id,
                receiverId: AnotherUserId
            }
            createChat(users).then((res) => {
                if (res.data) {
                    setCurrentChat(res.data)
                    setResponsive(true)
                }
            })
        }
    }, [])

    useEffect(() => {
        socket.emit('new-user-add', userData._id)
        socket.on('get-users', (users) => {
            setOnlineUsers(users)
        })
    }, [userData])

    // receive message from socket server
    useEffect(() => {
        socket.on('receive-message', (data) => {
            setRecieveMessage(data)
        })
    }, [])


    useEffect(() => {
        const getChats = async () => {
            try {
                const { data } = await userChats(userData._id)
                setChats(data)
            } catch (error) {
                console.log(error);
            }
        }
        getChats()
        if (currentChat) {
            getUserData()
        }
    }, [currentChat])


    const getUserData = async (userId) => {
        try {
            const { data } = await getUser(currentChat)
            setCurrentChat(data)
        } catch (error) {
            console.log(error);
        }
    };

    const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== userData._id)
        const online = onlineUsers.find((user) => user.userId === chatMember)
        return online ? true : false
    }

    return (
        <>
            <div className="flex h-screen antialiased text-gray-800 ml-20 md:ml-0">
                <div className={`${responsive ? 'hidden' : ''} md:block h-full  w-full md:w-4/12 overflow-x-hidden no-scrollbar`}>
                    <div className="w-9/4  border border-y-0 border-gray-800 h-full">
                        <div className="flex justify-start">
                            <div className="px-4 py-2 mx-2">
                            </div>
                            <div className="mx-2">
                                <h2 className="mb-5 text-xl font-bold text-white">Messages</h2>
                            </div>
                        </div>
                        <hr className="border-gray-800" />
                        <div className="flex flex-col py-8 pl-6 pr-2 w-full  bg-black flex-shrink-0  h-full">
                            <div className="flex flex-col">
                                <div className="flex flex-row items-center justify-between text-xs">
                                    <span className="font-bold text-white">Active Conversations</span>
                                </div>
                                {chats.map((chat, index) => {
                                    return (
                                        <div className="flex flex-col space-y-1 mt-4 max-h-screen overflow-y-auto  no-scrollbar" key={index}>
                                            <button onClick={() => {
                                                setCurrentChat(chat)
                                                setResponsive(true)
                                            }}
                                                className="flex flex-row items-center hover:bg-gray-100 rounded-md p-2 border-b-2 " >
                                                <div className="ml-2 text-sm font-semibold text-white"> <Conversation data={chat} currentUserId={userData._id} online={checkOnlineStatus(chat)} /></div>
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${responsive ? '' : 'hidden'} md:block w-full md:w-8/12`}>
                    <ChatRight chat={currentChat} currentUser={userData._id} setSendMessage={setSendMessage} recieveMessage={recieveMessage} />
                </div>

            </div>
        </>
    )
}

export default Chat