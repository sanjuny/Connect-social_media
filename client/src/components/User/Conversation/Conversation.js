import React, { useEffect, useState } from 'react'
import { getUser } from '../../../Api/UserApi/UserRequest'

const Conversation = ({ data, currentUserId, online }) => {
    console.log(data, 'converation data');

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        console.log('jjjjjjjjjjjjjj');
        const userId = data.members.find((id) => id !== currentUserId)
        console.log(userId, 'userId');
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
                console.log(data, 'getUserData');
            } catch (error) {
                console.log(error, 'catch error conversation');
            }
        }
        getUserData()
    }, [])

    return (
        <div>
            <a class='flex items-center px-3 py-2 text-sm transition duration-150  cursor-pointer hover:bg-gray-100 focus:outline-none'>
                <img class='object-cover w-10 h-10 rounded-full' src={'/images/' + userData?.image} alt='username' />
                <div>
                    <div class='flex justify-between'>
                        <span class='block ml-2 font-bold text-gray-600'>{userData?.username}</span>
                    </div>
                    {online && <span class='block text-sm text-green-400'>online</span>}
                </div>
            </a>
            {/* <hr className="border-white w-full" /> */}
        </div>
    )
}

export default Conversation