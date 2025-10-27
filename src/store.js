import { configureStore } from '@reduxjs/toolkit'
import slice  from './slices/slice'
import  messageSlice  from './slices/messageSlice'

export const store = configureStore({
  reducer: {
    user: slice,
    messageselect: messageSlice,
  },
})