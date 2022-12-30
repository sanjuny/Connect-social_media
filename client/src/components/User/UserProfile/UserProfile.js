import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { FaRegComment } from 'react-icons/fa'
import { FcLike } from 'react-icons/fc'
import dummy from '../../../Images/dummy.jpg'
import connect from '../../../Images/dummy.jpg'
import { useSelector } from 'react-redux'
import { editphoto, editPostDetails, getProfilePost, getUserByUsername, getUserFollowers, getUserFollowing, updateDetails } from '../../../Api/UserApi/UserRequest'
import { format, render, cancel, register } from 'timeago.js';
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { update } from '../../../Redux/StoreSlice'


function UserProfile() {
    /* ---------------------------- current userdata ---------------------------- */
    const userData = useSelector(state => state.user)
    console.log(userData, 'lolololooololo');
    /* ---------------------------- current userdata ---------------------------- */



    /* ------------------------ follow and unfollow user ------------------------ */
    const [user, setUser] = useState({})

    let username = useParams().username
    if (!username) {
        username = userData.username
    }

    useEffect(() => {
        const getUserData = async () => {
            try {
                const { data } = await getUserByUsername(username)
                console.log(data, 'getUserData');
                setUser(data)


            } catch (error) {
                console.log(error, 'catch error');
            }
        }
        getUserData()
    }, [username])

    /* ------------------------ follow and unfollow user ------------------------ */

    /* ------------------------------ show followers ----------------------------- */

    const [followMod, setFollowMod] = useState(false)
    const [myFollowers, setMyFollowers] = useState([])
    const showFollowers = async () => {
        let id;
        if (!username) {
            id = userData._id
        } else {
            id = user._id
        }
        try {
            const { data } = await getUserFollowers(id)
            console.log(data, 'userFollowers');
            setMyFollowers(data)
            setFollowMod(!followMod)
        } catch (error) {
            console.log(error, 'catch error');

        }
    }

    /* ------------------------------ show followers ----------------------------- */

    /* ----------------------------- show following ----------------------------- */


    const showFollowing = async () => {
        let id;
        if (!username) {
            id = userData._id
        } else {
            id = user._id
        }
        try {
            const { data } = await getUserFollowing(id)
            console.log(data, 'userFollowing');
            setMyFollowers(data)
            setFollowMod(!followMod)
        } catch (error) {
            console.log(error, 'catch error');

        }
    }

    /* ----------------------------- show following ----------------------------- */



    /* ------------------------------ getaddedpost ------------------------------ */

    const [post, setpost] = useState([])

    useEffect(() => {
        const Profile = async () => {
            try {
                const { data } = await getProfilePost(userData._id)
                console.log(data, 'lllllll');
                setpost(data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt)
                }))
            } catch (error) {
                console.log(error, 'userfffgsg');
            }
        }
        Profile()
    }, [])


    /* ------------------------------ getaddedpost ------------------------------ */

    /* ------------------------------- editprofile ------------------------------ */

    const [open, setOpen] = useState(false)

    const closeMODAl = () => {
        setOpen(false)
    }

    const openMODAL = () => {
        setOpen(true)
    }
    const dispatch = useDispatch()
    const [file, setFile] = useState("")
    const [edit, setedit] = useState({
        username: userData.username,
        name: userData.name,
        phone: userData.phone,
        bio: userData.bio,
    })
    var userId = userData._id

    const handleEdit = async (e) => {
        // e.preventDefault()
        const newEdit = {
            ...edit
        }

        if (file) {
            const datas = new FormData();
            const filename = file.name
            datas.append("file", file)
            datas.append("name", filename)
            try {
                const { data } = await editphoto(datas)
                console.log(data, 'datas profile picccc');
                edit.image = data.image
            } catch (error) {
                console.log(error, 'catch error handle error');
            }

            dispatch(update({ ...userData, ...edit }))
        }

        try {
            const { data } = updateDetails({ ...edit }, userId)
            console.log(data, 'updatedetails');
            console.log(edit, 'kkkkkkkkkkkkkjjjjjjj');
        } catch (error) {
            console.log(error);
        }
    }

    // handlechange

    const handlechange = (e) => {
        setedit({ ...edit, [e.target.name]: e.target.value })
    }

    /* ------------------------------- editprofile ------------------------------ */
    return (
        <>
            <div className=" ml-14 md:ml-0 flex overflow-y-auto fixed  h-screen no-scrollbar" style={{ width: '990px', backgroundColor: 'black' }}>
                <div className="w-3/5 border border-y-0 border-gray-800" style={{ maxWidth: '600px' }}>
                    <div>
                        <div className="flex justify-start">
                            <div className="px-4 py-0 mx-2">
                                <BiArrowBack className='w-7 h-7 text-white' />
                            </div>
                            <div className="mx-2">
                                <h2 className="mb-0 text-xl font-bold text-white">{userData.name}</h2>
                                <p className="mb-0 w-48 text-xs text-gray-400">916 Photos & videos</p>
                            </div>
                        </div>
                        <hr className="border-gray-800" />
                    </div>
                    <div>
                        <div className="w-full bg-cover bg-no-repeat bg-center"
                            style={{ height: '200px', backgroundImage: `url(${connect})` }}>
                            <img className="opacity-0 w-full h-full"
                                src={connect} alt="" />
                        </div>

                        <div className="p-4">
                            {username !== userData.username ?
                                <div className="relative flex w-full space-x-4 space-x-reverse">
                                    <div className="flex flex-1">
                                        <div style={{ marginTop: '-96px' }}>
                                            <div style={{ height: '144px', width: '144px' }}
                                                className="md rounded-full relative avatar">
                                                <img style={{ height: '144px', width: '144px' }}
                                                    className="md rounded-full relative border-4 border-gray-900"
                                                    src={dummy}
                                                    alt="" />
                                                <div className="absolute"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <button
                                            onClick={openMODAL}
                                            className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring   max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto">
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                                :
                                <div className="relative flex w-full space-x-4 space-x-reverse">
                                    <div className="flex flex-1">
                                        <div style={{ marginTop: '-96px' }}>
                                            <div style={{ height: '144px', width: '144px' }}
                                                className="md rounded-full relative avatar">
                                                <img style={{ height: '144px', width: '144px' }}
                                                    className="md rounded-full relative border-4 border-gray-900"
                                                    src={'/images/' + userData.image}
                                                    alt="" />
                                                <div className="absolute"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <button
                                            onClick={openMODAL}
                                            className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring   max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto">
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            }


                            <div className="space-y-1 justify-center w-full mt-3 ml-3">

                                {!username ? <>
                                    <div>
                                        <h2 className="text-xl leading-6 font-bold text-white">{userData?.name}</h2>
                                        <p className="text-sm leading-5 font-medium text-gray-600">@{userData?.username}</p>
                                    </div>
                                </>
                                    : <>
                                        <div>
                                            <h2 className="text-xl leading-6 font-bold text-white">{user?.name}</h2>
                                            <p className="text-sm leading-5 font-medium text-gray-600">@{user?.username}</p>
                                        </div>
                                    </>
                                }


                                {!username ?
                                    <>
                                        <div className="mt-3">
                                            <p className="text-white leading-tight mb-2">{userData?.bio}</p>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className="mt-3">
                                            <p className="text-white leading-tight mb-2">{user?.bio}</p>
                                        </div>
                                    </>
                                }


                                {/* <div className="mt-3">
                                    <p className="text-white leading-tight mb-2">Vibe high the magic will unfold you.....</p>
                                </div> */}
                                <div
                                    className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
                                    <div className="text-center pr-3"><span className="font-bold text-white">{user?.following?.length}</span><span
                                        className="text-gray-600" onClick={showFollowing}> Following</span></div>
                                    <div className="text-center px-3"><span className="font-bold text-white">{user?.followers?.length}
                                    </span><span className="text-gray-600" onClick={showFollowers}> Followers</span></div>
                                </div>
                            </div>
                        </div>
                        <hr className="border-gray-800" />
                    </div>

                    {/* showing followers modal */}

                    {
                        myFollowers.map((persons) => {
                            return (
                                <div class=" z-10 w-60 bg-white">
                                    <ul class="overflow-y-auto py-1 h-auto hover:bg-gray-800 hover:text-blue-300" aria-labelledby="dropdownUsersButton">
                                        <li>
                                            <a class="flex items-center py-2 px-4 hover:bg-gray-800 hover:text-blue-300">
                                                <img class="mr-2 w-6 h-6 rounded-full" src={dummy} alt="Jese image" />
                                                {persons.username}
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                    }

                    {/* tabs */}


                    <ul className="list-none">
                        <li>
                            {post.map((obj) => {
                                return (
                                    <div className="">
                                        <div className="flex flex-shrink-0 p-4 pb-0">
                                            <div className="flex-shrink-0 group block">
                                                <div className="flex items-center">
                                                    <div>
                                                        <img className="inline-block h-10 w-10 rounded-full"
                                                            src={'/images/' + obj.userId.image}
                                                            alt="" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <p className="text-base leading-6 font-medium text-white">
                                                            {obj.userId.name}
                                                            <span
                                                                className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                                @{obj.userId.username} {format(obj.createdAt)}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pl-16">
                                            <p className="text-base width-auto font-medium text-white flex-shrink">
                                                {obj.description}
                                                <a className="text-blue-400"> #CopaAmerica #Argentina</a>
                                            </p>
                                            <div className="md:flex-shrink pr-6 pt-3">
                                                <div className="bg-cover bg-no-repeat bg-center rounded-lg w-full h-64"
                                                    style={{ height: 'auto' }}>
                                                    <img src={'/images/' + obj.image} style={{ height: '550px', width: '480px' }}></img>
                                                </div>
                                            </div>
                                            {/* <div className="flex gap-5 items-center py-4">
                                                <div className="flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out gap-3">
                                                    <FaRegComment className='w-6 h-6' />12.5k
                                                </div>
                                                <div className="flex items-center text-xs text-gray-400 hover:text-red-800 transition duration-350 ease-in-out gap-3">
                                                    <FcLike className='w-6 h-6' />10.5k
                                                </div>
                                            </div> */}
                                        </div>
                                        <hr className="border-gray-800" />
                                    </div>
                                )
                            })}
                        </li>
                    </ul>
                </div>
            </div>
            {/* </div> */}
            {/* </div> */}
            { /* -------------------------------- openmodal ------------------------------- */}
            {
                open ? (

                    <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                        <div className="relative  my-6 mx-auto ">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-gradient-to-r from-gray-900 bg-gray-600" >
                                <form>
                                    <div className="flex  p-3 border-b border-solid border-slate-200 rounded-t-lg">
                                        <div className="flex justify-center w-full">
                                            <h3 className="  mt-5 text-3xl font-bold text-white">
                                                Edit Your Profile ...
                                            </h3>
                                        </div>
                                        <button
                                            className=" ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        >
                                            <span onClick={closeMODAl} className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    <div className="flex relative p-6 flex-col w-auto md:w-[600px] gap-3 items-center object-cover " >
                                        <div className='flex justify-center items-center '>
                                            <label className="flex flex-col rounded-lg border-4 w-full h-30 p-10 group text-center">
                                                <div className="h-full w-full text-center flex flex-col items-center justify-center  ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                    </svg>
                                                </div>
                                                <input
                                                    type="file"
                                                    name='file'
                                                    onChange={(e) => { { setFile(e.target.files[0]) } }}
                                                    className="hidden" />
                                            </label>
                                        </div>
                                        <div className=" w-full">
                                            <div>
                                                <label htmlFor="Fullname " className="text-sm font-bold text-gray-500">Full Name
                                                    <input type="text" onChange={handlechange} name="name" className="bg-gray-8 rounded-lg  w-full text-black  p-1 pl-3" value={edit.name} />
                                                </label>
                                                <p className="text-red-500"></p>
                                            </div>
                                            {/* <div>
                                                <label htmlFor="UserName" className="text-sm font-bold text-gray-500">User Name
                                                    <input type="text" onChange={handlechange} name="username" className="bg-white rounded-lg   w-full text-black p-1 pl-3" value={edit.username} />
                                                </label>
                                                <p className="text-red-500"></p>
                                            </div> */}
                                        </div>
                                        <div className="w-full ">
                                            <label htmlFor="phone" className="text-sm font-bold text-gray-500">Mobile
                                                <input type="number" onChange={handlechange} name="phone" className="bg-white rounded-lg  w-full  text-black p-1 pl-3" value={edit.phone} checked />
                                                <p className="text-red-500"></p>
                                            </label>
                                        </div>
                                        <div className="w-full " >
                                            <label htmlFor="bio" className="text-sm font-bold text-gray-500" >About
                                                <input type="text" onChange={handlechange} name="bio" className="bg-white rounded-lg  w-full text-black  p-1 pl-3" value={edit.bio} />
                                                <p className="text-red-500"></p>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center bg-gradient-to-r from-gray-900 bg-gray-600 p-1 border-t border-solid border-slate-200 rounded-b-lg">
                                        <button onClick={(e) => handleEdit(e)} type="button" className="my-5 w-72 flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                            font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                                            Save Changes
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

export default UserProfile