import React, { useContext } from 'react'
import image from '../../../Images/logowhite.png'
import dummy from '../../../Images/dummy.jpg'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { IoIosNotifications } from 'react-icons/io'
import { BiHome, BiLogOutCircle, BiSearch } from 'react-icons/bi'
import { AiOutlineMessage, AiOutlinePlusCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { addpost, fetchNoCounts, findSearch, notificationManage } from '../../../Api/UserApi/UserRequest';
import { UserUpdation } from '../../../UserContext/userContext'
import { socket } from '../../../UserContext/SocketContext';
import { addMessage } from '../../../Redux/StoreAnother';


function Menubar() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [open, setOpen] = useState(false);

    const navigate = useNavigate()
    const [err, seterr] = useState('')

    const { postsUpdate, setpostsUpdate } = useContext(UserUpdation)

    /* ---------------------------------- logut --------------------------------- */

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

    const [desc, setDesc] = useState('')
    const [post, setPost] = useState()

    const handlechange = (e) => {
        setDesc(e.target.value)

    }

    const handleimage = (e) => {
        setPost(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            let data = new FormData()
            data.append('file', post)
            data.append('description', desc)
            data.append('userId', userData._id)
            await addpost(data)
            setPostOpen(false)
            setpostsUpdate(!postsUpdate)
        } catch (error) {
            seterr('Please upload a valid image file')
        }
    }

    const [postopen, setPostOpen] = useState(false)

    const closeMODAl = () => {
        setPostOpen(false)
    }

    const openMODAL = () => {
        setPostOpen(true)
    }


    /* ---------------------------- notication count ---------------------------- */

    const [notification, setNotification] = useState('')

    const fetchnotificationsCount = async () => {
        try {
            const { data } = await fetchNoCounts(userData._id)
            setNotification(data)
        } catch (error) {
            console.log(error);
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


    /* ----------------------- manage notification count ----------------------- */
    const dispatch = useDispatch()


    const notificationHandler = async () => {
        try {
            const { data } = await notificationManage(userData._id)
            setNotification("0")
            navigate('/notification')
        } catch (error) {
            console.log(error);
        }
    }

    const handlemessage = async () => {
        await dispatch(addMessage(null))
        navigate('/chat')
    }


    /* ------------------------------ manage search ----------------------------- */

    const [serachUser, setSearchUser] = useState([])
    const [serachModal, setSearchModal] = useState(false)

    const handleSearch = async (e) => {
        const val = e.target.value
        if (val == '') {
            setSearchUser([])
        }
        try {
            const { data } = await findSearch(val)
            setSearchUser(data)
        } catch (error) {
            console.log(error);
        }
    }

    const openMod = () => {
        setSearchModal(true)
    }

    const closeMod = () => {
        setSearchModal(false)
    }


    /* -------------------------- messgae notifications ------------------------- */
    const [message, setMessgae] = useState(false)

    useEffect(() => {
        socket.on("receive-message", data => {
            setMessgae(true)
        })
    }, [message])


    /* ---------------------- responsive sidebar functions ---------------------- */

    const menus = [
        { name: "Home", link: '/home', icon: BiHome },
        { name: "Notifications", action: notificationHandler, icon: IoIosNotifications },
        { name: "Add Post", action: openMODAL, icon: AiOutlinePlusCircle },
        { name: "Messages", action: handlemessage, icon: AiOutlineMessage },
        { name: "search", action: openMod, icon: BiSearch },
        { name: "Logout", action: Logout, icon: BiLogOutCircle },

    ];

    return (

        <>
            <section className={`flex gap-6 ${open ? 'w-72' : 'w-16'} `}>
                <div className={`bg-[#000000] min-h-screen fixed  ${open ? 'w-72' : 'w-20'}
            duration-500 text-gray-100 px-4`}>

                    <div className='py-3 flex justify-end'>
                        <img src={image} style={{ height: '40px' }}></img>
                    </div>
                    <div className='mt-4 flex flex-col gap-2 relative'>
                        {menus?.map((menu, i) => (
                            <Link
                                to={menu?.link}
                                onClick={menu?.action}
                                key={i}
                                className={` ${menu?.margin && "mt-5"
                                    } group flex items-center text-sm gap-3.5 font-medium p-4 hover:bg-gray-800 
                             rounded-md`}>

                                <div>{React.createElement(menu?.icon, { size: "28" })}</div>
                                <h2
                                    style={{
                                        transitionDelay: `${i + 3}00ms`,
                                    }}
                                    className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                        } `}>
                                    {menu?.name}
                                </h2>
                                <h2
                                    className={`${open && "hidden"
                                        } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 
                                rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 
                                group-hover:py-1 group-hover:left-14 group-hover:duration-300 
                                group-hover:w-fit`}>
                                    {menu?.name}
                                </h2>
                            </Link>
                        ))}
                        {notification != 0 ?
                            <span class="inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap top-20 align-baseline font-bold  bg-red-600 text-white rounded ml-8 absolute">{notification}</span>
                            : null
                        }
                        {message != 0 ?
                            <span class="flex h-3 w-3pointer-events-none">
                                <span class="top-56 mb-1 ml-8 absolute inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-400  rounded  opacity-75"></span>
                                <span class="bottom-48 mt-2 h-2 w-2 ml-8 relative animate-ping inline-block py-1 px-1.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-red-600  rounded"></span>
                            </span>
                            : null
                        }
                        <div>
                            <Link to='/profile' className="flex items-center">
                                <img className="mt-52 inline-block h-10 w-10 rounded-full"
                                    src={PF + userData.image}
                                    alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            {/* openmodal */}
            {postopen ? (
                <div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover">
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        {/* <div className="absolute bg-black opacity-60 inset-0 z-0"></div> */}
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


            {/* serach */}
            {
                serachModal ? (
                    <div className='mt-52 absolute flex justify-center items-center bg-opacity-50  z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full'>
                        <div className='relative w-full h-full max-w-md md:h-auto'>
                            <div className=' rounded-lg shadow bg-gradient-to-r from-gray-900 bg-gray-600'>
                                <button
                                    type='button'
                                    onClick={closeMod}
                                    className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
                                    data-modal-toggle='crypto-modal'
                                >
                                    X<span className='sr-only'>Close modal</span>
                                </button>
                                <div className='px-6 py-4  border-b rounded-t dark:border-gray-600'>
                                    <div className='relative text-gray-600 '>
                                        <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                                            <svg
                                                fill='none'
                                                stroke='currentColor'
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                                stroke-width='2'
                                                viewBox='0 0 24 24'
                                                className='w-6 h-6 text-gray-300'
                                            >
                                                <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                                            </svg>
                                        </span>
                                        <input
                                            type='search'
                                            onChange={handleSearch}
                                            className='block mt-6 w-full py-2 pl-10 bg-gray-100 rounded-xl outline-none'
                                            name='search'
                                            placeholder='Search....'
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='p-6'>
                                    <ul className='my-4 space-y-3 max-h-[50%] overflow-y-auto no-scrollbar'>
                                        {serachUser.length !== 0
                                            ? serachUser.map((user) => (
                                                <Link to={`/profile/${user.username}`}>
                                                    <li className='m-2'>
                                                        <div className='flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white'>
                                                            <img
                                                                class='object-cover w-10 h-10 rounded-full'
                                                                src={PF + user?.image}
                                                                alt=''
                                                            />
                                                            <span className='flex-1 ml-3 whitespace-nowrap'>{user?.username}</span>
                                                        </div>
                                                    </li>
                                                </Link>
                                            ))
                                            : null}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </>



    )
}

export default Menubar