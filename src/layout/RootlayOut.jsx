import React, { useEffect } from 'react'
import { Outlet } from 'react-router'
import app from '../firebase.Config'
import { getAuth } from 'firebase/auth';



const RootlayOut = () => {
  const auth = getAuth(app);

  useEffect(()=>{
    console.log(auth.currentUser);
    
  },[auth.currentUser])

  return (
   <>
    <h1>Header</h1>
    <Outlet/>
    <h1>Footer</h1>
   </>
  )
}

export default RootlayOut