import { createSlice } from "@reduxjs/toolkit";


const defaultUser = JSON.parse(localStorage.getItem('user'))

if(defaultUser){
    var { name, username, _id, followers, following} = defaultUser
}else{

}


const userSlice = createSlice({
    name:'user',
    initialState:{
        _id,
        name,
        username,
        followers,
        following
    },
    reducers:{
        update:(state, action)=>{
            state._id = action.payload._id
            state.name = action.payload.name
            state.username = action.payload.username
            state.followers = action.payload.followers
            state.following = action.payload.following
        }
    },
    remove:(state)=>{state = {}}
})

export const {update, remove} = userSlice.actions

export default userSlice.reducer;