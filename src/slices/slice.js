import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : "",
}

export const slice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    userInfo: (state,action) => {
    
      state.value = action.payload
    },
   
  
  },
})


export const { userInfo} = slice.actions

export default slice.reducer 