import { configureStore } from '@reduxjs/toolkit'

import userReducer from './StoreSlice'

export default configureStore({
    reducer:{
        user:userReducer
    }
})