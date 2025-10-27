import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
}

export const messageSlice = createSlice({
  name: 'messageInfo',
  initialState,
  reducers: {
    messageselect: (state,action) => {
    
      state.value = action.payload
    },
   
  
  },
})


export const { messageselect } = messageSlice.actions

export default messageSlice.reducer