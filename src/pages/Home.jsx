import React from 'react'
import {  useSelector } from 'react-redux'
import User from '../componetes/home/User';
import Userlist from '../componetes/home/Userlist';
import Friendlist from '../componetes/home/Friendlist';


const Home = () => {


  let user = useSelector((state)=> state.user.value);


  return (
    <>
    <User/>
    {/* <Userlist/> */}
    {/* <Friendlist/> */}
     
    </>
  )
}

export default Home