import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import messi from '../../../Images/messi.jpg'
import dummy from '../../../Images/dummy.jpg'
import { FaRegComment, FaRegHeart } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { FcLike } from 'react-icons/fc'
import { addcomment, addlike, getcomments, getpost } from '../../../Api/UserApi/UserRequest'
import { format, render, cancel, register } from 'timeago.js';
function Post({ post }) {

    /* ---------------------------- current userdata ---------------------------- */
    const userData = useSelector(state => state.user)
    console.log(userData, 'lolololooonhjgyugv');
    /* ---------------------------- current userdata ---------------------------- */



    /* ------------------------------- handle like ------------------------------- */

    useEffect(() => {
        setLikeState(post.likes.includes(userData._id))

    }, [userData._id, post._id])

    const [Like, setLike] = useState(post?.likes?.length)
    const [LikeState, setLikeState] = useState(false)

    const [posted, setposted] = useState([])

    const [comments, setcomments] = useState([])





    useEffect(() => {
        const getUserPost = async () => {
            try {
                const { data } = await getpost(userData._id)
                console.log(data, 'koko');
                setposted(data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt)
                }))
            } catch (error) {
                console.log(error, 'catch error');
            }
        }
        getUserPost()
    }, [LikeState])




    const handlelike = async (postId) => {
        console.log(handlelike);
        try {
            const { data } = await addlike(userData._id, postId)
            console.log(data, 'likesss');
            setLike(LikeState ? Like - 1 : Like + 1)
            setLikeState(!LikeState)
        } catch (error) {
            console.log(error, 'catch error');
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
        console.log('call handlesetcomment');
        try {
            setcomment(e.target.value)


        } catch (error) {
            console.log(error, 'catch error comment one');

        }
    }


    const handleComment = async (postId) => {
        const datas = {
            userId: userData._id,
            comment: comment
        }
        console.log(datas, 'kjhgfdfgh');
        try {
            const { data } = await addcomment(datas, postId)
            setcomment('')
            console.log(data, 'kkkkiiii');
        } catch (error) {
            console.log(error, 'catch error comment');
        }
    }


    const getUserComment = async (postId) => {
        console.log('lkjhgfdjsjsj');
        try {
            const { data } = await getcomments(postId)
            console.log(data, 'comment data');
            setcomments(data)

            setOpen(true)
        } catch (error) {
            console.log(error, 'catching hjbdjshfd');
        }
    }

    /* ----------------------------- handle comment ----------------------------- */


    return (
        <div className=" transition duration-350 ease-in-out ">
            <div className="flex flex-shrink-0 p-4 pb-0">
                <div className="flex-shrink-0 group block">
                    <div className="flex items-center">
                        <div>
                            <img className="inline-block h-10 w-10 rounded-full"
                                src={dummy}
                                alt="" />
                        </div>
                        <div className="ml-3">
                            <p className="text-base leading-6 font-medium text-white">
                                {post.userId.name}

                                <span
                                    className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                                    @{post.userId.username} {format(post.createdAt)}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pl-16">
                <p className="text-base width-auto font-medium text-white flex-shrink">
                    {post.description}
                    <a className="text-blue-400"> #hashtags #hasgtagsplus</a>
                </p>
                <div className="md:flex-shrink pr-6 pt-3">
                    <div className="bg-cover bg-no-repeat bg-center rounded-lg w-full h-64 object-contain"
                        style={{ height: 'auto' }}>
                        <img src={'/images/' + post.image} style={{ height: '480px', width: '500px' }} alt={post.image} ></img>
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
                    <div className=" px-0 mx-auto  w-[700px] max-h-[200px] overflow-y-scroll no-scrollbar">
                        <div className="flex-col  w-[590px]   bg-black border-b-2 border-r-2 border-black sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm">
                            <button onClick={closeMODAl} type="button" className="float-left rounded-md p-2 inline-flex items-center justify-center text-white hover:text-black hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black">
                                <span className="sr-only">Close menu</span>
                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div onClick={(e) => handleComment(post._id)} className="flex float-right  items-center text-xs text-blue-500 hover:text-blue-400 transition duration-350 ease-in-out gap-3">
                                <FiSend className='w-6 h-6' />
                            </div>
                            <div className="flex-1 px-2 ml-2 text-sm  w-full font-medium leading-loose text-white">
                                <textarea className=' w-[400px] focus:outline-none flex flex-wrap no-scrollbar bg-black' onChange={handleStateComment} type='text' placeholder='Comment Here' value={comment}></textarea>
                            </div>
                            {comments?.map((item) => {
                                return (
                                    <div className="flex flex-row">
                                        <img className="object-cover w-12 h-12 border-2 border-gray-300 rounded-full" alt="Noob master's avatar"
                                            src={dummy} />
                                        <div className="flex-col mt-1">
                                            <div className="flex items-center flex-1 px-4 font-bold leading-tight text-gray-500">{item.userId.name}
                                                <span className="ml-2 text-xs font-normal text-gray-500">{format(item.createdAt)}</span>
                                            </div>
                                            <div className="flex-1 px-2 ml-2 text-sm  w-full font-medium leading-loose text-white">
                                                {item?.comment}
                                            </div>
                                            <button className="inline-flex items-center px-1 pt-2 ml-1 flex-column">
                                                <svg className="w-5 h-5 ml-2 text-gray-600 cursor-pointer fill-current hover:text-gray-900"
                                                    viewBox="0 0 95 78" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M29.58 0c1.53.064 2.88 1.47 2.879 3v11.31c19.841.769 34.384 8.902 41.247 20.464 7.212 12.15 5.505 27.83-6.384 40.273-.987 1.088-2.82 1.274-4.005.405-1.186-.868-1.559-2.67-.814-3.936 4.986-9.075 2.985-18.092-3.13-24.214-5.775-5.78-15.377-8.782-26.914-5.53V53.99c-.01 1.167-.769 2.294-1.848 2.744-1.08.45-2.416.195-3.253-.62L.85 30.119c-1.146-1.124-1.131-3.205.032-4.312L27.389.812c.703-.579 1.49-.703 2.19-.812zm-3.13 9.935L7.297 27.994l19.153 18.84v-7.342c-.002-1.244.856-2.442 2.034-2.844 14.307-4.882 27.323-1.394 35.145 6.437 3.985 3.989 6.581 9.143 7.355 14.715 2.14-6.959 1.157-13.902-2.441-19.964-5.89-9.92-19.251-17.684-39.089-17.684-1.573 0-3.004-1.429-3.004-3V9.936z"
                                                        fill-rule="nonzero" />
                                                </svg>
                                            </button>
                                            <button className="inline-flex items-center px-1 -ml-1 flex-column">
                                                <svg className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700" fill="none"
                                                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                                                    </path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                            <hr className="border-gray-800" />
                        </div>
                    </div>
                ) : null
            }
            {/* modal */}
        </div>
    )
}

export default Post