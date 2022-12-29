import { createContext, useState } from "react";


export const UserUpdation = createContext(' ')

function Updation({ children }) {
    const [profileUpdate, setProfileUpdate] = useState(true)
    const [likesUpdate, setLikesUpdate] = useState(true)
    const [postsUpdate, setpostsUpdate] = useState(true)
    const [feedsUpdate, setfeedsUpdate] = useState(true)
    const [serachModal, setSearchModal] = useState(false)
    return (
        <UserUpdation.Provider value={{ setProfileUpdate, profileUpdate, setLikesUpdate, likesUpdate, setpostsUpdate, postsUpdate, setfeedsUpdate, feedsUpdate, setSearchModal, serachModal }}>
            {children}
        </UserUpdation.Provider>
    )
}



export default Updation;