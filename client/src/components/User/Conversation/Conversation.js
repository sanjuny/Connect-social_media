import React, { useEffect, useState } from 'react'
import { getUser } from '../../../Api/UserApi/UserRequest'

const Conversation = ({ data, currentUserId, online }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
            } catch (error) {
                console.log(error);
            }
        }
        getUserData()
    }, [])

    return (
        <div>
            <a class='flex items-center px-3 py-2 text-sm transition duration-150  cursor-pointer hover:bg-gray-100 focus:outline-none'>
                <img class='object-cover w-10 h-10 rounded-full' src={PF + userData?.image} alt='username' />
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