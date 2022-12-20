import { createContext, useState } from "react";


export const UserUpdation = createContext(' ')

function Updation({children})
{
    const [profileUpdate, setProfileUpdate] = useState(true)
    return(
        <UserUpdation.Provider value={{setProfileUpdate,profileUpdate}}>
            {children}
        </UserUpdation.Provider>
    )
}

export default Updation;