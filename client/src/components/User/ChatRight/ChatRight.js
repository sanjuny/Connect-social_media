import React, { useState, useEffect } from 'react'
import { getMessages, getUser } from '../../../Api/UserApi/UserRequest';
import { format, render, cancel, register } from 'timeago.js';
import InputEmoji from "react-input-emoji";

function ChatRight({ chat, currentUser }) {

    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessages, setNewMessages] = useState('')

    //fetching data for headers in chat box

    useEffect(() => {
        console.log('eeeeeeeeeeffffffffffffffffecccccccccccccceee');
        const userId = chat?.members?.find((id) => id !== currentUser);
        console.log(userId, 'jhgfdefggggggggggg');
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data)
                console.log(userData, 'kkkkkkkkkkkkkkkfffffff');
            } catch (error) {
                console.log(error);
            }
        };
        if (chat !== null) getUserData();
    }, [chat, currentUser])
    console.log(userData, 'userData');


    //fetching data for messages

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id)
                console.log(data, 'fetchmesaage');
                setMessages(data)
            } catch (error) {
                console.log(error);
            }
        };
        if (chat !== null) fetchMessages();
    }, [chat])


    const handleChange = (newMessages) => {
        setNewMessages(newMessages)
    }

    return (
        <>
            <div className="flex h-screen  antialiased text-gray-800">
                <div className="flex flex-row h-full w-full overflow-x-hidden">
                    <div className="flex flex-col flex-auto h-full p-6">
                        {chat ? (
                            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-black h-full p-4">
                                {/* heder */}
                                <div className="flex justify-center mb-10">
                                    <a className="inline-flex items-start mr-3" href="#0">
                                        <img className="rounded-full" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg" width="48" height="48" alt="Lauren Marsano" />
                                    </a>
                                    <div className="pr-1">
                                        <a className="inline-flex text-white hover:text-indigo-500" href="#0">
                                            <h2 className="text-xl leading-snug font-bold">{userData?.name}</h2>
                                        </a>
                                        <a className="block text-sm font-medium text-gray-500 hover:text-indigo-500" href="#0">@{userData?.username}</a>
                                    </div>
                                </div>
                                {/* heder */}
                                <hr className="border-gray-800" />
                                <div className=" flex flex-col h-full overflow-x-auto mb-4">
                                    <div className="flex flex-col h-full overflow-y-scroll  no-scrollbar">
                                        {messages.map((message) => {
                                            return (
                                                <div className={message.senderId === currentUser ? "message own" : "message"}>
                                                    <div className="grid grid-cols-12 gap-y-2">
                                                        <div className="col-start-1 col-end-8 p-3 rounded-lg">
                                                            <div className="flex flex-row items-center">
                                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" >  A </div>
                                                                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                                    <div>{message.text}</div>
                                                                </div>
                                                            </div>
                                                            <span className='text-gray-500'>{format(message.createdAt)}</span>
                                                        </div>
                                                        <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                                            <div className="flex items-center justify-start flex-row-reverse">
                                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" >a </div>
                                                                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                                    <div>I'm ok wat about you?</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-start-6 col-end-13 p-3 rounded-lg">
                                                            <div className="flex items-center justify-start flex-row-reverse">
                                                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" >a </div>
                                                                <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                                    <div>  Lorem ipsum dolor sit amet, consectetur adipisicing
                                                                        elit. Vel ipsa commodi illum saepe numquam maxime
                                                                        asperiores voluptate sit, minima perspiciatis.</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="flex flex-row items-center h-16 rounded-xl bg-[#202327] w-full px-4">
                                    <div>
                                        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="flex-grow ml-4 ">
                                        <div className="relative w-full  ">
                                            <InputEmoji
                                                value={newMessages}
                                                onChange={handleChange}
                                                type="text"
                                                placeholder='Start a message'
                                                className="flex w-full  rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 text-white bg-[#202327]" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <button className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" >
                                            <span>Send</span>
                                            <span className="ml-2">
                                                <svg
                                                    className="w-4 h-4 transform rotate-45 -mt-px"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                    ></path>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-screen w-full flex flex-col justify-center items-center bg-black">
                                <h3 className='text-4xl font-bold text-white pr-12  '>Select a message</h3>
                                <p className='text-gray-500'>Choose from your existing conversations, start a <br/>new one, or just keep swimming.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}

export default ChatRight