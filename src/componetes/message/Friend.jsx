import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { messageselect } from "../../slices/messageSlice";
import { BsThreeDotsVertical } from "react-icons/bs";


const Friend = () => {
  let user = useSelector((state) => state.user.value);
  let selector = useSelector((state) => state.messageselect.value);
  let dispatch = useDispatch();
  const db = getDatabase();
  let [friend, setFriend] = useState([]);

  useEffect(() => {
    const friendlistRef = ref(db, 'friendlist/');
    onValue(friendlistRef, (snapshot) => {
      let array = [];

      snapshot.forEach((item) => {

        if (user.uid == item.val().senderId || user.uid == item.val().receiverId) {
          array.push({ ...item.val(), id: item.key });

        }

      });
      setFriend(array);



    });
  }, []);
  let handlefriend = (item) => {
    if (user.uid == item.senderId) {

      dispatch(messageselect({
        name: item.receiverName,
        id: item.receiverId,
        email: item.receiverEmail,
        photoURL: item.photoURL
      }));
    } else {
      dispatch(messageselect({
        name: item.sendername,
        id: item.senderId,
        email: item.senderEmail,
        photoURL: item.photoURL
      }));
    }

  }
  let [show, setShow] = useState(() => {

  })

  let handleBlock = (item) => {

    if (user.uid == item.senderId) {
      set(push(ref(db, 'Blocklist/')), {
        BlockbyId : user.uid,
        Blockby : user.displayName,
        Blockuser : item.receiverName,
        BlockuserId : item.receiverId

      }).then(() => {
         remove(ref(db, 'friendlist/' + item.id));
       });
    }else{
      set(push(ref(db, 'Blocklist/')), {
        BlockbyId : user.uid,
        Blockby : user.displayName,
        Blockuser : item.sendername,
        BlockuserId : item.senderId

      }).then(() => {
         remove(ref(db, 'friendlist/' + item.id));
       });
    }
  }


  return (
    <>

      {friend.map((item) => (
        <div key={item.id}>

          {/* Friend Row */}
          <div
            onClick={() => handlefriend(item)}
            className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-sky-100 transition-all duration-200 group"
          >
            <div className="relative">
              <img
                src={item.photoURL}
                className="w-10 h-10 rounded-full object-cover border border-slate-200"
              />
            </div>

            <div className="flex-1">
              <h3 className="text-slate-800 font-medium leading-tight">
                {user.uid === item.senderId ? item.receiverName : item.sendername}
              </h3>
              <p className="text-xs text-slate-400 group-hover:text-sky-600">Online</p>
            </div>

            {/* Three dots menu button */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShow(show === item.id ? null : item.id);
              }}
              className="p-1 border rounded-full"
            >
              <BsThreeDotsVertical />
            </div>
          </div>


          {show === item.id && (
            <div className="bg-emerald-300 p-3 ml-12 mt-1 rounded-lg shadow">
              <ul className="text-slate-800 font-medium leading-tight">
                <li className="p-2 hover:bg-[#fff] border cursor-pointer">View Contact</li>
                <li className="p-2 hover:bg-[#fff] border cursor-pointer">Search</li>
                <li className="p-2 hover:bg-[#fff] border cursor-pointer">New Group</li>
                <li className="p-2 hover:bg-[#fff] border cursor-pointer">Mute notification</li>

                <li
                  onClick={() => handleBlock(item)}
                  className="p-2 hover:bg-[#fff] border cursor-pointer"
                >
                  Block
                </li>
              </ul>
            </div>
          )}

        </div>
      ))}







    </>
  )
}

export default Friend