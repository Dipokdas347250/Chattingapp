import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "",
}

export const slice = createSlice({
  name: 'userinfo',
  initialState,
  reducers: {
    userInfo: (state,action) => {
    
      state.value = action.payload
    },
    remove:(state,action)=>{
     state.value = ""
    }
  
  },
})


export const { userInfo ,remove} = slice.actions

export default slice.reducer 