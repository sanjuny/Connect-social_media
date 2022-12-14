import React, { useState, useEffect } from 'react'
import { getUser } from '../../../Api/UserApi/UserRequest';

function ChatRight({ chatUser, currentUser }) {
    console.log(chatUser, " props on right side");
    const [userData, setUserData] = useState({})
    console.log(userData, 'uuuuuuuuuuuuuserData');


    useEffect(() => {
        console.log('eeeeeeeeeeffffffffffffffffecccccccccccccceee');
        const userId = chatUser?.members?.find((id) => id !== currentUser);
        console.log(userId, 'jhgfdefggggggggggg');
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId);
                setUserData(data)
                console.log(userData, 'kkkkkkkkkkkkkkkfffffff');
            } catch (error) {
                console.log(error);
            }
            console.log(userData, 'userData');
        };
        if (chatUser !== null) getUserData();
    }, [chatUser, currentUser])

    return (
        <>
            <div class="flex h-screen  antialiased text-gray-800">
                <div class="flex flex-row h-full w-full overflow-x-hidden">
                    <div class="flex flex-col flex-auto h-full p-6">
                        <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-black h-full p-4">
                            {/* heder */}
                            <div class="flex justify-center mb-10">
                                <a class="inline-flex items-start mr-3" href="#0">
                                    <img class="rounded-full" src="https://res.cloudinary.com/dc6deairt/image/upload/v1638102932/user-48-01_nugblk.jpg" width="48" height="48" alt="Lauren Marsano" />
                                </a>
                                <div class="pr-1">
                                    <a class="inline-flex text-white hover:text-indigo-500" href="#0">
                                        <h2 class="text-xl leading-snug font-bold">{chatUser?.name}</h2>
                                    </a>
                                    <a class="block text-sm font-medium text-gray-500 hover:text-indigo-500" href="#0">@{chatUser?.username}</a>
                                </div>
                            </div>
                            {/* heder */}
                            <hr className="border-gray-800" />
                            <div class=" flex flex-col h-full overflow-x-auto mb-4">
                                <div class="flex flex-col h-full overflow-y-scroll  no-scrollbar">
                                    <div class="grid grid-cols-12 gap-y-2">
                                        <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" >  A </div>
                                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                    <div>hey</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                            <div class="flex flex-row items-center">
                                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">A  </div>
                                                <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                                    <div>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing
                                                        elit. Vel ipsa commodi illum saepe numquam maxime
                                                        asperiores voluptate sit, minima perspiciatis.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div class="flex items-center justify-start flex-row-reverse">
                                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" >a </div>
                                                <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                    <div>I'm ok wat about you?</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div class="flex items-center justify-start flex-row-reverse">
                                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" >a </div>
                                                <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                    <div>  Lorem ipsum dolor sit amet, consectetur adipisicing
                                                        elit. Vel ipsa commodi illum saepe numquam maxime
                                                        asperiores voluptate sit, minima perspiciatis.</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div class="flex items-center justify-start flex-row-reverse">
                                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" >a </div>
                                                <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                    <div>  Lorem ipsum dolor sit amet, consectetur adipisicing
                                                        elit. Vel ipsa commodi illum saepe numquam maxime
                                                        asperiores voluptate sit, minima perspiciatis.</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-start-6 col-end-13 p-3 rounded-lg">
                                            <div class="flex items-center justify-start flex-row-reverse">
                                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" >a </div>
                                                <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                                    <div>  Lorem ipsum dolor sit amet, consectetur adipisicing
                                                        elit. Vel ipsa commodi illum saepe numquam maxime
                                                        asperiores voluptate sit, minima perspiciatis.</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex flex-row items-center h-16 rounded-xl bg-[#202327] w-full px-4">
                                <div>
                                    <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
                                        <svg
                                            class="w-5 h-5"
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
                                <div class="flex-grow ml-4 ">
                                    <div class="relative w-full  ">
                                        <input
                                            type="text"
                                            placeholder='Start a message'
                                            class="flex w-full  rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 text-white bg-[#202327]" />
                                        <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                                            <svg
                                                class="w-6 h-6"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="ml-4">
                                    <button class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0" >
                                        <span>Send</span>
                                        <span class="ml-2">
                                            <svg
                                                class="w-4 h-4 transform rotate-45 -mt-px"
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
                    </div>
                </div>
            </div>

        </>
    )
}

export default ChatRight