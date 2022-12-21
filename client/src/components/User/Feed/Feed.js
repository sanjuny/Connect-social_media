import React, { useEffect, useRef, useState } from 'react'
import { addcomment, addlike, getcomments, getpost } from '../../../Api/UserApi/UserRequest'
import { useSelector } from 'react-redux'
import Post from '../Post/post'
import { useContext } from 'react'
import { UserUpdation } from '../../../UserContext/userContext'



function Feed() {

    /* ---------------------------- current userdata ---------------------------- */
    const userData = useSelector(state => state.user)
    console.log(userData, 'lolololooonhjgyugv');
    /* ---------------------------- current userdata ---------------------------- */

    const { likesUpdate, setLikesUpdate } = useContext(UserUpdation)
    const { postsUpdate, setpostsUpdate } = useContext(UserUpdation)
    const { feedsUpdate, setfeedsUpdate } = useContext(UserUpdation)

    /* --------------------------- handling user post --------------------------- */
    const [post, setpost] = useState([])
    const [comments, setcomments] = useState([])



    console.log(comments, 'kkkkkkkkkkkkkkkk');
    console.log(post, 'datafeed');

    useEffect(() => {
        const getUserPost = async () => {
            try {
                const { data } = await getpost(userData._id)
                console.log(data, 'koko');
                setpost(data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt)
                }))
            } catch (error) {
                console.log(error, 'catch error');
            }
        }
        getUserPost()
    }, [likesUpdate, postsUpdate, feedsUpdate])


    /* --------------------------- handling user post --------------------------- */

    return (
        < >
            <div role="main">
                <div className="flex overflow-y-auto fixed  h-screen no-scrollbar" style={{ width: '990px' }}>
                    <div className="w-3/5 border border-y-0 border-gray-800" style={{ maxWidth: '600px' }}>
                        <div>
                            <div className="flex justify-start">
                                <div className="px-4 py-2 mx-2">
                                </div>
                                <div className="mx-2">
                                    <h2 className="mb-5 text-xl font-bold text-white">Home</h2>
                                </div>
                            </div>
                            <hr className="border-gray-800" />
                        </div>

                        {/* Feed/ */}

                        <ul className="list-none">
                            <li>
                                {post.map((obj) => {
                                    return (
                                        <Post key={obj.id} post={obj} />
                                    )
                                })}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}




export default Feed
