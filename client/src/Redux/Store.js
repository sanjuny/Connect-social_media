import { configureStore } from '@reduxjs/toolkit'

import userReducer from './StoreSlice'
import anotheruserReducer from './StoreAnother'

export default configureStore({
    reducer:{
        user:userReducer,
        anotheruser:anotheruserReducer
    }
})