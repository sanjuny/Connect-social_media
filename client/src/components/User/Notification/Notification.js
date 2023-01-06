import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { getAllNotification } from '../../../Api/UserApi/UserRequest'
import { format, render, cancel, register } from 'timeago.js';
import { socket } from '../../../UserContext/SocketContext';
import dummy from '../../../Images/dummy.jpg'

function Notification() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    /* ---------------------------- current userdata ---------------------------- */
    const userData = useSelector(state => state.user)
    /* ---------------------------- current userdata ---------------------------- */

    /* ------------------------------ notification ------------------------------ */

    useEffect(() => {
        socket.on("getNotification", data => {
            setNotCount((prev) => [...prev, data])
        })
    }, [socket])

    const [notification, setNotification] = useState([])
    const [notCount, setNotCount] = useState([])

    useEffect(() => {
        const fetchNotifications = async () => {
            const { data } = await getAllNotification(userData._id)
            setNotification(data)
        }
        fetchNotifications()
    }, [socket, notCount])


    return (
        <>
            <div role="main">
                <div className="ml-14 md:ml-0 flex overflow-y-auto fixed  h-screen no-scrollbar" style={{ width: '990px', backgroundColor: 'black' }}>
                    <div className="w-3/5 border border-y-0 border-gray-800" style={{ maxWidth: '600px' }}>
                        <div className="w-full border border-y-0 border-gray-800">
                            {/* header */}
                            <div>
                                <div className="flex justify-start">
                                    <div className="px-4 py-0 mx-2">
                                        <BiArrowBack className='w-7 h-7 text-white' />
                                    </div>
                                    <div className="px-2">
                                        <h2 className="mb-4 text-xl font-bold text-white">Notifications</h2>
                                    </div>
                                </div>
                                <hr className="border-gray-800" />
                            </div>
                            {/* header */}
                            {/* body */}
                            {notification.map((noti) => {
                                return (
                                    <div className='bg-gradient-to-r from-gray-900 bg-gray-800'>
                                        <a className="flex py-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <div className="flex-shrink-0">

                                                {noti.user?.image ?
                                                    <img className="w-11 h-11 rounded-full" src={PF + noti.user?.image} alt="Jese image" />
                                                    :
                                                    <img className="w-11 h-11 rounded-full" src={dummy} alt="Jese image" />
                                                }
                                                <div className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 bg-blue-600 rounded-full border border-white dark:border-gray-800">
                                                    <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                                                </div>
                                            </div>
                                            <div className="pl-3 w-full">
                                                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">New message from <span className="font-semibold text-gray-900 dark:text-white">{noti.user.username}</span>: "{noti.desc}"</div>
                                                <div className="text-xs text-blue-600 dark:text-blue-500">{format(noti.time)}</div>
                                            </div>
                                        </a>
                                    </div>
                                )
                            })}
                            {/* body */}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Notification