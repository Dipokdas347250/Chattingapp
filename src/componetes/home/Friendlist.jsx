import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";



const FriendList = () => {
    let user = useSelector((state) => state.user.value);
    let [friendList, setFriendList] = useState([]);


  const db = getDatabase();
  
   useEffect(() => {
      const addfriendRef = ref(db, 'addfriend/');
      onValue(addfriendRef, (snapshot) => {
        let array = [];
  
        snapshot.forEach((item) => {
          if (user.uid == item.val().receiverId) {

            array.push({ ...item.val(), id: item.key });
          }
        });
       setFriendList(array);
    
  
      });
    }, []);

    let handleComfrim = (confirm) => {
        set(push(ref(db, 'friendlist/')), {
          ...confirm,
          status: "accepted"
          
        }).then(() => {
          remove(ref(db, 'addfriend/' + confirm.id));
        });
    };


  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">👬 Friend List</h1>

      <div className="grid sm:grid-cols-1 gap-4 ">
        {friendList.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition p-3 rounded-lg shadow-sm"
          >
            {/* Avatar + Info */}
            <div className="flex items-center gap-3">
              <div className="relative">
                
                {friend.photo ? (
                  <img
                    src={friend.photo}
                    alt={friend.photo}
                    className="w-12 h-12 rounded-full object-cover border-2 border-sky-500"
                  />
                ) : (
                  <FaUserCircle className="text-5xl text-slate-400" />
                )}
                {friend.status === "Online" && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
                
                
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800">{friend.sendername}</h2>
                <h2 className="text-[14px] font-semibold text-slate-800">{friend.senderEmail}</h2>
                
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button onClick={() => handleComfrim(friend)}
                className="p-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition"
                title="Confirm"
              >
                Confirm
              </button>
              <button
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                title="Remove"
              >
                Remove
                
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
