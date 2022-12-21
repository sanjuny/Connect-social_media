import React, { useContext, useEffect, useState } from 'react'
import image from '../../../Images/logowhite.png'
import dummy from '../../../Images/dummy.jpg'
import { BiHome, BiLogOutCircle } from 'react-icons/bi'
import { IoIosNotifications } from 'react-icons/io'
import { AiOutlineMessage } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { addpost, fetchNoCounts, notificationManage } from '../../../Api/UserApi/UserRequest'
import { useSelector } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert';
import { socket } from '../../../UserContext/SocketContext'
import { UserUpdation } from '../../../UserContext/userContext'







function LeftBar() {
    const navigate = useNavigate()
    const [err, seterr] = useState('')

    const { postsUpdate, setpostsUpdate } = useContext(UserUpdation)


    useEffect(() => {
        const token = localStorage.getItem('userToken')
        if (!token) {
            navigate('/login')
        }
    })

    const Logout = () => {
        confirmAlert({
            title: 'Approve Application',
            message: "Are you sure to Approve this Application",
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        localStorage.removeItem('userToken')
                        navigate('/login')
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    /* -------------------------------- add post -------------------------------- */


    const userData = useSelector(state => state.user)
    console.log(userData, 'lolololooololo');


    const [desc, setDesc] = useState('')
    const [post, setPost] = useState()

    const handlechange = (e) => {

        console.log(e, 'kijhgf');
        setDesc(e.target.value)

    }

    const handleimage = (e) => {
        console.log(e, 'post');
        setPost(e.target.files[0])
        console.log(e.target.value, 'hello');
        console.log(e.target.files, 'hy');
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('call tebhkbasbjs');
        try {
            console.log(post, 'llll');
            let data = new FormData()
            data.append('file', post)
            data.append('description', desc)
            data.append('userId', userData._id)
            console.log(data, 'daaaaaaaa');
            await addpost(data)
            setOpen(false)
            setpostsUpdate(!postsUpdate)
        } catch (error) {
            console.log(error, 'catch error eroor rororor');
            seterr('Please upload a valid image file')
        }
    }

    const [open, setOpen] = useState(false)

    const closeMODAl = () => {
        setOpen(false)
    }

    const openMODAL = () => {
        setOpen(true)
    }
    /* -------------------------------- add post -------------------------------- */


    /* ---------------------------- notication count ---------------------------- */

    const [notification, setNotification] = useState('')

    const fetchnotificationsCount = async () => {
        try {
            const { data } = await fetchNoCounts(userData._id)
            console.log(data, 'fetchnotificationsCount');
            setNotification(data)
        } catch (error) {
            console.log(error, 'catch error fetchnotificationsCount');
        }
    }


    useEffect(() => {
        if (userData) {
            socket.emit("new-user-add", userData._id)
        }
        fetchnotificationsCount()
    }, []);


    useEffect(() => {
        socket.on("getNotification", data => {
            fetchnotificationsCount()
        })
    }, [socket, notification])


    /* ---------------------------- notication count ---------------------------- */


    /* ----------------------- manage notification count ----------------------- */
    // const [notificationData, setNotificationData] = useState([])
    // const [counts, SetCounts] = useState('')


    const notificationHandler = async () => {
        try {
            const { data } = await notificationManage(userData._id)
            console.log(data, 'notificationHandler');
            setNotification("0")
            navigate('/notification')
        } catch (error) {
            console.log(error,'sssssssss');

        }
    }




    /* ----------------------- manage notification count ----------------------- */


    return (
        <>
            <div className="text-white py-4 h-auto">
                <div style={{ width: '275px' }}>
                    <div className="overflow-y-auto h-screen pr-3" style={{ width: "275px" }}>
                        <div className="mt-5 px-2">
                            <img src={image} style={{ height: '70px' }}></img>
                            <Link to='/home' className="mt-5 group flex items-center px-2 py-2 text-white leading-6 font-semibold rounded-full hover:bg-gray-800 hover:text-blue-300">
                                <BiHome className='w-7 h-7' />
                                <h2 className='pl-4'>Home</h2>
                            </Link>
                            {notification != 0 ?
                                <div onClick={notificationHandler} className="mt-5 group flex items-center px-2 py-2 text-white leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
                                    <IoIosNotifications className='w-7 h-7' />
                                    <h2 className='pl-4 '>Notifications</h2>
                                    <span class="inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600 text-white rounded ml-2">{notification}</span>
                                </div>
                                : null

                            }
                            <Link to='/chat' className="mt-5 group flex items-center px-2 py-2 text-white leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
                                <AiOutlineMessage className='w-7 h-7' />
                                <h2 className='pl-4'>Messages</h2>
                            </Link>
                            <a onClick={Logout} className="mt-5 group flex items-center px-2 py-2 text-white leading-6 font-medium rounded-full hover:bg-gray-800 hover:text-blue-300">
                                <BiLogOutCircle className='w-7 h-7' />
                                <h2 className='pl-4'>logout</h2>
                            </a>
                            <button onClick={openMODAL} className="bg-blue-400 hover:bg-blue-500 w-full mt-5 text-white font-bold py-2 px-4 rounded-full">
                                <h2 className='pl-4'>Add Post</h2>
                            </button>
                        </div>
                        <div className="absolute" style={{ bottom: '2rem' }}>
                            <div className="flex-shrink-0 flex hover:bg-gray-800 rounded-full px-4 py-3 mt-12 mr-2">
                                <div className="flex-shrink-0 group block">
                                    <Link to='/profile' v className="flex items-center">
                                        <div>
                                            <img className="inline-block h-10 w-10 rounded-full"
                                                src={dummy}
                                                alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-base leading-6 font-medium text-white">
                                                {userData.name}
                                            </p>
                                            <p
                                                className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">@
                                                {userData.username}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* open modal */}

            {
                open ? (
                    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover">
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                            <div className="sm:max-w-lg w-full p-10 bg-gradient-to-r from-gray-900 bg-gray-600 rounded-xl z-10">
                                <button onClick={closeMODAl} type="button" className="float-right bg-whit rounded-md p-2 inline-flex items-center justify-center text-black hover:text-black hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                                    <span className="sr-only">Close menu</span>
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className="text-center">
                                    <h2 className="mt-5 text-3xl font-bold text-white">
                                        File Upload!
                                    </h2>

                                </div>
                                {err && <div className=" w-98 px p-2 mb-2 text-sm text-center text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert"> {err}</div>}
                                <form className="mt-8 space-y-3">
                                    <div className="grid grid-cols-1 space-y-2">
                                        <label className="text-sm font-bold text-gray-500 tracking-wide">Description</label>
                                        <input
                                            type="text"
                                            name='description'
                                            placeholder='Description'
                                            value={desc}
                                            onChange={handlechange}
                                            className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" />
                                    </div>
                                    <div className="grid grid-cols-1 space-y-2">
                                        <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col rounded-lg border-4 w-full h-60 p-10 group text-center">
                                                <div className="h-full w-full text-center flex flex-col items-center justify-center  ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                    <p className="pointer-none text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a href="" id="" className="text-blue-600 hover:underline">select a file</a> from your computer</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    name='file'
                                                    onChange={handleimage}
                                                    className="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={(e) => handleSubmit(e)} type="button" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                            font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                                            Upload
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>

    )
}

export default LeftBar