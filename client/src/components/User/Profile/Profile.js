import React, { useContext, useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router';
import { addcomment, addfollow, addlike, createChat, getcomments, getProfilePost, getUserByUsername, getUserFollowers, getUserFollowing, userPost } from '../../../Api/UserApi/UserRequest';
// import dummy from '../../../Images/dummy.jpg'
// import connect from '../../../Images/dummy.jpg'
import cover from '../../../Images/cover-1.jpg'
import { format, render, cancel, register } from 'timeago.js';
import { UserUpdation } from '../../../UserContext/userContext'
import { addMessage } from '../../../Redux/StoreAnother'




function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    let Navigate = useNavigate()

    /* ---------------------------- current userdata ---------------------------- */
    const userData = useSelector(state => state.user)
    /* ---------------------------- current userdata ---------------------------- */

    const { profileUpdate, setProfileUpdate } = useContext(UserUpdation)
    const dispatch = useDispatch()



    const [State, setState] = useState(false)

    useEffect(() => {
        const getuserpost = async () => {
            try {
                const { data } = await userPost()
            } catch (error) {
                console.log(error);
            }
        }
        getuserpost()
    }, [])




    /* ------------------------ follow and unfollow user and post ------------------------ */

    const [user, setUser] = useState({})
    const [person, setPerson] = useState([])

    let username = useParams().username


    useEffect(() => {
        const getUserData = async () => {
            try {
                const { data } = await getUserByUsername(username)
                setUser(data)
                await userPost(data._id).then((response) => {
                    setPerson(response.data)
                })
            } catch (error) {
                console.log(error);
            }
        }
        getUserData()
    }, [username, State])

    /* ------------------------ follow and unfollow user and post ------------------------ */

    /* ------------------------------ show followers ----------------------------- */

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
            setMyFollowers(data)
        } catch (error) {
            console.log(error);

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
            setMyFollowers(data)
        } catch (error) {
            console.log(error);

        }
    }

    /* ----------------------------- show following ----------------------------- */


    /* ------------------------------- follow user ------------------------------ */


    const follow = async (id) => {
        try {
            const { data } = await addfollow(userData._id, id)
            setState(!State)
            setProfileUpdate(!profileUpdate)
        } catch (error) {
            console.log(error);
        }
    }

    /* ------------------------------- follow user ------------------------------ */

    /* ------------------------------- create chat ------------------------------ */

    const onHandleChange = async () => {
        let users = {
            senderId: userData._id,
            receiverId: user._id
        }
        try {
            const { data } = await createChat(users)
            dispatch(addMessage(user._id))
            Navigate(`/chat`)
        } catch (error) {
            console.log(error);
        }
    }

    /* ------------------------------- create chat ------------------------------ */


    return (
        <div className="ml-14 md:ml-0 flex overflow-y-auto fixed  h-screen no-scrollbar" style={{ width: '990px', backgroundColor: 'black' }}>
            <div className="w-3/5 border border-y-0 border-gray-800" style={{ maxWidth: '600px' }}>
                <div>
                    <div className="flex justify-start">
                        <div className="px-4 py-0 mx-2">
                            <BiArrowBack className='w-7 h-7 text-white' />
                        </div>
                        <div className="mx-2">
                            <h2 className="mb-0 text-xl font-bold text-white">{user.name}</h2>
                            <p className="mb-0 w-48 text-xs text-gray-400">916 Photos & videos</p>
                        </div>
                    </div>
                    <hr className="border-gray-800" />
                </div>
                <div>
                    <div className="w-full bg-cover bg-no-repeat bg-center"
                        style={{ height: '200px', backgroundImage: `url(${cover})` }}>
                        <img className="opacity-0 w-full h-full"
                            src={cover} alt="" />
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
                                                src={PF + user.image}
                                                alt="" />
                                            <div className="absolute"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col text-right ">
                                    <div onClick={onHandleChange}
                                        className="flex justify-center  max-h-max whitespace-nowrap focus:outline-none  focus:ring   max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto">
                                        message
                                    </div>
                                </div>

                                <div className="flex flex-col text-right">
                                    {user?.followers?.includes(userData._id) ?
                                        <button
                                            className="bg-transparent hover:bg-gray-800 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full"
                                            onClick={() => follow(user._id)}>
                                            UnFollow
                                        </button>

                                        : <button
                                            className="bg-transparent hover:bg-gray-800 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded-full"
                                            onClick={() => follow(user._id)}
                                        >
                                            Follow
                                        </button>
                                    }
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
                                                src={PF + userData.image}
                                                alt="" />
                                            <div className="absolute"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col text-right">
                                    <button

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

                            <div className="mt-3">
                                <p className="text-white leading-tight mb-2">Vibe high the magic will unfold you.....</p>
                            </div>
                            <div
                                className="pt-3 flex justify-start items-start w-full divide-x divide-gray-800 divide-solid">
                                <div onClick={showFollowing} className="text-center pr-3"><span className="font-bold text-white">{user?.following?.length}</span><span
                                    className="text-gray-600"> Following</span></div>
                                <div onClick={showFollowers} className="text-center px-3"><span className="font-bold text-white">{user?.followers?.length}
                                </span><span className="text-gray-600"> Followers</span></div>
                            </div>
                        </div>
                    </div>
                    <hr className="border-gray-800" />
                </div>


                {
                    myFollowers.map((persons) => {
                        return (
                            <div class=" z-10 w-60 bg-white rounded shadow dark:bg-gray-700">
                                <ul class="overflow-y-auto py-1 h-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUsersButton">
                                    <li>
                                        <a class="flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            <img class="mr-2 w-6 h-6 rounded-full" src={PF + persons.image} alt="Jese image" />
                                            {persons.username}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        )
                    })
                }

                <ul className="list-none">
                    <li>
                        {person.map((obj) => {
                            return (
                                <div className="">
                                    <div className="flex flex-shrink-0 p-4 pb-0">
                                        <div className="flex-shrink-0 group block">
                                            <div className="flex items-center">
                                                <div>
                                                    <img className="inline-block h-10 w-10 rounded-full"
                                                        src={PF + user.image}
                                                        alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="text-base leading-6 font-medium text-white">
                                                        {user.name}
                                                        <span
                                                            className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                            @{user.username} {format(obj.createdAt)}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pl-16">
                                        <p className="text-base width-auto font-medium text-white flex-shrink">
                                            {obj.description}
                                        </p>
                                        <div className="md:flex-shrink pr-6 pt-3">
                                            <div className="bg-cover bg-no-repeat bg-center rounded-lg w-full h-64"
                                                style={{ height: 'auto' }}>
                                                <img src={PF + obj.image} style={{ height: '540px', width: '480px' }}></img>
                                            </div>
                                        </div>
                                        <div className="flex gap-5 items-center py-4">
                                        </div>
                                    </div>
                                    <hr className="border-gray-800" />
                                </div>
                            )
                        })}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Profile