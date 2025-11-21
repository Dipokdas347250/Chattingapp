import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from "react-redux";



const Blicklist = () => {
    let user = useSelector((state) => state.user.value);
    let [blockList, setblockList] = useState([]);


  const db = getDatabase();
  
   useEffect(() => {
      const blocklistRef = ref(db, 'Blocklist/');
      onValue(blocklistRef, (snapshot) => {
        let array = [];
  
        snapshot.forEach((item) => {
            if(user.uid == item.val().BlockbyId){

                array.push({ ...item.val(), id: item.key });
            }
        });
       setblockList(array);
       console.log(array);
       
      });
    }, []);

    let handleunblock = (item)=>{
    remove(ref(db, 'Blocklist/' + item.id));
    }
 


  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-6"> Block List</h1>

      <div className="grid sm:grid-cols-1 gap-4 ">
        {blockList.map((friend) => (
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
                <h2 className="text-lg font-semibold text-slate-800">{friend.Blockuser}</h2>
                <h2 className="text-[14px] font-semibold text-slate-800">{friend.senderEmail}</h2>
                
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button onClick={()=>handleunblock(friend)}
                className="p-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition"
                title="Confirm"
              >
                Unblock
              </button>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blicklist;
