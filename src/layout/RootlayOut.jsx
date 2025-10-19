import React, { useEffect } from 'react'
import { Outlet , useNavigate } from 'react-router'
import app from '../firebase.Config'
import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';



const RootlayOut = () => {
  let navigate = useNavigate()
  const auth = getAuth(app);
  
  let user = useSelector((state)=> state.user.value);

  useEffect(()=>{
    if(!user){
     navigate("/signin")
    }

    
  },[auth.currentUser])

  return (
   <>
  
    <Outlet/>
   
   </>
  )
}

export default RootlayOut