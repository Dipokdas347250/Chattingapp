import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remove, userInfo } from '../slices/slice'

const Home = () => {
  let disaptch = useDispatch()

  let data = useSelector((state)=> state.user.value.name);

  

  let handlemenu = ()=>{
    disaptch(userInfo({name:"Dipok"}))
  }
  let handleremove = ()=>{
    disaptch(remove(""))
  }


  return (
    <>
    <button onClick={handlemenu} className='p-[20px] text-2xl text-[#000] font-bold font-sans'>Menu</button> <br />
    <button onClick={handleremove} className='p-[20px] text-2xl text-[#000] font-bold font-sans'>remove</button>
    {data}
    
    </>
  )
}

export default Home