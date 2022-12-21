import { createContext, useState } from "react";


export const UserUpdation = createContext(' ')

function Updation({ children }) {
    const [profileUpdate, setProfileUpdate] = useState(true)
    const [likesUpdate, setLikesUpdate] = useState(true)
    const [postsUpdate, setpostsUpdate] = useState(true)
    const [feedsUpdate, setfeedsUpdate] = useState(true)
    return (
        <UserUpdation.Provider value={{ setProfileUpdate, profileUpdate, setLikesUpdate, likesUpdate, setpostsUpdate, postsUpdate, setfeedsUpdate, feedsUpdate }}>
            {children}
        </UserUpdation.Provider>
    )
}



export default Updation;