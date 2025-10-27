import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { messageselect } from "../../slices/messageSlice";

const Friend = () => {
      let user = useSelector((state) => state.user.value);
      let selector = useSelector((state) => state.messageselect.value);
      let dispatch = useDispatch();
     const db = getDatabase();
     let [friend, setFriend] = useState([]);
      
       useEffect(() => {
          const addfriendRef = ref(db, 'friendlist/');
          onValue(addfriendRef, (snapshot) => {
            let array = [];
      
            snapshot.forEach((item) => {
              if (user.uid == item.val().receiverId || user.uid == item.val().senderId){

                  array.push({ ...item.val(), id: item.key });
              }
    
              
            });
           setFriend(array);
        
      
          });
        }, []);
      let handlefriend = (item) => {
        if(user.uid == item.sendername){

          dispatch(messageselect({
            name: item.receivername,
            id: item.receiverId,
            email: item.receiverEmail,
            photo: item.photoURL
          }));
        }else{
          dispatch(messageselect({
            name: item.sendername,
            id: item.senderId,
            email: item.senderEmail,
            photo: item.photoURL
          }));
        }
       
      }


  return (
    <>


      {friend.map((item) => (

            <div onClick={() => handlefriend(item)} className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-sky-100 transition-all duration-200 group">
            <div className="relative">
                <img
                src={item.photoURL}
                alt={item.sendername}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="flex-1">
                {user.uid == item.sendername ? (
                    <h3 className="text-slate-800 font-medium leading-tight">{item.receivername}</h3>
                ) : (
                    <h3 className="text-slate-800 font-medium leading-tight">{item.sendername}</h3>
                )}
                <p className="text-xs text-slate-400 group-hover:text-sky-600">
                Online
                </p>
               
            </div>
            <div className={`w-2 h-2   ${item.senderId == selector.id || item.receiverId == selector.id ? "bg-sky-500" : "bg-slate-200"} animate-pulse rounded-full`}></div>
            </div>
      ))}

       

     
  
    
    </>
  )
}

export default Friend