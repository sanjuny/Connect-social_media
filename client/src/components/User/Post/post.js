import React, { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import dummy from '../../../Images/dummy.jpg'
import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FiSend } from 'react-icons/fi'
import { FcLike } from 'react-icons/fc'
import { addcomment, addlike, deletepost, getcomments, getpost, reportPost } from '../../../Api/UserApi/UserRequest'
import { format, render, cancel, register } from 'timeago.js';
import { socket } from '../../../UserContext/SocketContext';
import { UserUpdation } from '../../../UserContext/userContext';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';



function Post({ post }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    let username = useParams().username
    const navigate = useNavigate()

    /* ---------------------------- current userdata ---------------------------- */
    const userData = useSelector(state => state.user)
    /* ---------------------------- current userdata ---------------------------- */

    /* ------------------------------- handle like ------------------------------- */
    const { likesUpdate, setLikesUpdate } = useContext(UserUpdation)

    useEffect(() => {
        setLikeState(post.likes.includes(userData._id))

    }, [userData._id, post._id])

    const [Like, setLike] = useState(post?.likes?.length)
    const [LikeState, setLikeState] = useState(false)
    const [posted, setposted] = useState([])
    const [comments, setcomments] = useState([])


    const handlelike = async (postId) => {
        try {
            const { data } = await addlike(userData._id, postId)
            socket.emit('send-notification', {
                senderId: userData._id,
                receiverId: post.userId._id,
                type: 'liked your post'
            })
            setLike(LikeState ? Like - 1 : Like + 1)
            setLikesUpdate(!likesUpdate)
        } catch (error) {
            console.log(error);
        }
    }

    /* ------------------------------- handle like ------------------------------- */

    /* ----------------------------- handle comment ----------------------------- */


    const [comment, setcomment] = useState('')
    const [open, setOpen] = useState(false)

    const closeMODAl = () => {
        setOpen(false)
    }

    const openMODAL = () => {
        setOpen(true)
    }

    const handleStateComment = (e) => {
        try {
            setcomment(e.target.value)
        } catch (error) {
            console.log(error);
        }
    }


    const handleComment = async (postId) => {
        const datas = {
            userId: userData._id,
            comment: comment,
            postUser: post.userId._id
        }
        try {
            const { data } = await addcomment(datas, postId)
            socket.emit('send-notification', {
                senderId: userData._id,
                receiverId: post.userId._id,
                type: 'commented your post'
            })
            setcomment('')
            setOpen(!open)
        } catch (error) {
            console.log(error);
        }
    }


    const getUserComment = async (postId) => {
        try {
            const { data } = await getcomments(postId)
            setcomments(data)
            setOpen(!open)
        } catch (error) {
            console.log(error);
        }
    }

    /* ----------------------------- handle comment ----------------------------- */

    /* ------------------------------- report post ------------------------------ */

    const [reportValue, setReportValue] = useState("");
    const [pop, setPop] = useState(false)
    const [reportPop, setReportPop] = useState(false)

    const handleReport = async (e) => {
        try {
            e.preventDefault()
            const { data } = await reportPost(userData._id, reportValue, post._id)
            setReportValue(new Date())
            setReportPop(!reportPop)
            setPop(!pop)
        } catch (error) {
            console.log(error);
        }
    }

    /* ------------------------------- report post ------------------------------ */

    /* ------------------------------- delete post ------------------------------ */

    const deleteConfirm = () => {
        confirmAlert({
            title: 'Delete Post',
            message: "Are you sure want to Delete the post",
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const { data } = await deletepost(post._id)
                        setLikesUpdate(!likesUpdate)
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    /* ------------------------------- delete post ------------------------------ */

    return (
        <>
            <div className=" transition duration-350 ease-in-out ">
                <div className="flex flex-shrink-0 p-4 pb-0 justify-between">
                    <div className="flex-shrink-0 group block w-full">
                        <div className="flex items-center justify-between ">
                            <Link to={`/profile/${post.userId?.username}`}>
                                <div className='flex'>
                                    {post.userId?.image ?
                                        <img className="inline-block h-10 w-10 rounded-full"
                                            src={PF + post.userId?.image}
                                            alt="" />
                                        :
                                        <img className="inline-block h-10 w-10 rounded-full"
                                            src={dummy}
                                            alt="" />
                                    }
                                    <div className="ml-3 flex justify-center items-center">
                                        <p className="text-base leading-6 font-medium text-white">
                                            {post.userId.name}
                                            <span
                                                className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                                @{post.userId.username} {format(post.createdAt)}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                            <div className='relative'>
                                <BsThreeDotsVertical className=' text-white float-right w-6 h-6' onClick={(e) => setPop(!pop)} />
                                {/* dropdown modal */}
                                {
                                    pop ? (
                                        <div class='absolute top-10 right-2 cursor-pointer z-30 bg-gray-300 shadow-sm rounded-full border flex-col flex justify-end'>
                                            <ul>
                                                {post.userId._id === userData._id ?
                                                    <>
                                                        <li>
                                                            <a onClick={(e) => deleteConfirm()} class="text-sm rounded-full hover:bg-gray-800 hover:text-blue-300 block px-4 py-2">Delete</a>
                                                        </li>
                                                    </> :
                                                    <>
                                                        <li>
                                                            <a onClick={(e) => setReportPop(!reportPop)} class="text-sm rounded-full hover:bg-gray-800 hover:text-blue-300 block px-4 py-2">Report</a>
                                                        </li>
                                                    </>
                                                }

                                            </ul>
                                        </div>
                                    ) : null
                                }
                                {/* dropdown modal */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pl-16">
                    <p className="text-base width-auto font-medium text-white flex-shrink">
                        {post.description}
                        {/* <a className="text-blue-400"> #hashtags #hasgtagsplus</a> */}
                    </p>
                    <div className="md:flex-shrink pr-6 pt-3">
                        <div className="bg-cover bg-no-repeat bg-center rounded-lg w-full h-64"
                            style={{ height: 'auto' }}>
                            <img src={PF + post.image} style={{ height: '540px', width: '500px', objectFit: 'fill' }} alt={post.image} ></img>
                        </div>
                    </div>
                    <div className="flex gap-5 items-center py-4">

                        <div onClick={(e) => getUserComment(post._id)} className="flex items-center text-xs text-gray-400 hover:text-blue-400 transition duration-350 ease-in-out gap-3">
                            <FaRegComment className='w-6 h-6' />
                        </div>
                        <div onClick={(e) => handlelike(post._id)} className="flex items-center text-xs text-gray-400 hover:text-red-800 transition duration-350 ease-in-out gap-3">
                            {
                                post.likes.includes(userData._id) ?
                                    <FcLike className='w-6 h-6' />
                                    :
                                    <FaRegHeart className='w-6 h-6' />
                            }{post.likes.length}
                        </div>
                    </div>
                </div>
                {/* modal */}
                {
                    open ? (
                        <div className=" px-0 mx-auto  w-[540px] max-h-[200px] overflow-y-scroll no-scrollbar">
                            <div className="flex-col  w-[590px]   bg-black border-b-2 border-r-2 border-black sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm">
                                <div className="flex  m-2 text-sm w-full font-medium text-white">
                                    <textarea className=' w-[400px] border-b-2 border-b-gray-500 focus:outline-none flex flex-wrap  no-scrollbar bg-black' onChange={handleStateComment} type='text' placeholder='Comment Here' value={comment}></textarea>
                                    <hr className="border-white" />
                                    <button onClick={(e) => handleComment(post._id)} className="flex  items-center text-xs text-blue-500 hover:text-blue-400 transition duration-350 ease-in-out gap-3 disabled:text-blue-200" disabled={!comment}>
                                        <FiSend className='w-6 h-6' />
                                    </button>
                                </div>
                                {comments?.map((item) => {
                                    return (
                                        <Link to={`/profile/${item.userId.username}`}>
                                            <div className="flex flex-row mt-6">
                                                <img className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full" alt="Noob master's avatar"
                                                    src={PF + item.userId.image} />
                                                <div className="flex-col mt-1">
                                                    <div className="flex items-center flex-1 px-4 font-bold leading-tight text-gray-400 ">{item.userId.name}
                                                        <span className="ml-2 text-xs font-normal text-gray-500">{format(item.createdAt)}</span>
                                                    </div>
                                                    <div className="flex-1 px-2 ml-2 text-sm  w-full font-medium leading-loose text-white">
                                                        {item?.comment}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                                <hr className="border-gray-800" />
                            </div>
                        </div>
                    ) : null
                }
                {/* modal */}


                {/* reportmodal */}
                {
                    reportPop ? (
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/* {/content/} */}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-400 outline-none focus:outline-none">
                                    {/* {/header/} */}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-xl font-semibold">Why are you Reporting this?</h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"

                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/* {/body/} */}
                                    <div className="flex">
                                        <input type="radio" className="m-2" name="Content" value="Violation of someone's privacy" onClick={(e) => { setReportValue(e.target.value) }} checked />
                                        <label htmlFor="" className="p-2">Violation of someone's privacy
                                        </label>
                                    </div>
                                    <div className="flex">
                                        <input type="radio" className="m-2" name="Content" value="Public shaming" onClick={(e) => { setReportValue(e.target.value) }} />
                                        <label htmlFor="" className="p-2">Public shaming
                                        </label>
                                    </div>
                                    <div className="flex">
                                        <input type="radio" className="m-2" name="Content" value="Goes against my beliefs, values or politics" onClick={(e) => { setReportValue(e.target.value) }} />
                                        <label htmlFor="" className="p-2">Goes against my beliefs, values or politics
                                        </label>
                                    </div>
                                    <div className="flex">
                                        <input type="radio" className="m-2" name="Content" value="Supporting or promoting a hate group" onClick={(e) => { setReportValue(e.target.value) }} />
                                        <label htmlFor="" className="p-2">Supporting or promoting a hate group
                                        </label>
                                    </div>

                                    {/* {/footer/} */}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button onClick={(e) => setReportPop(!reportPop)}
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"

                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={handleReport}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>

        </>

    )
}

export default Post