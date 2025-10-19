import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";


const UserList = () => {
  let user = useSelector((state) => state.user.value);
  const db = getDatabase();
  let [userList, setUserList] = useState([])

  useEffect(() => {
    const usersRef = ref(db, 'users/');
    onValue(usersRef, (snapshot) => {
      let array = [];

      snapshot.forEach((item) => {
        if (item.key !== user.uid)
          array.push({ ...item.val(), key: item.key });

      });
      setUserList(array);

    });
  }, []);

  let handleAdd = (item) => {

    set(push(ref(db, 'addfriend/')), {
      // senderId: user.uid,
      sendername: user.displayName,
      senderEmail: user.email,
      // senderPhone: user.number,
      // receiverId: item.uid,
      receiverName: item.username,
      receiverEmail: item.email,
      // receiverPhone: item.number,
      status: "pending",
      photoURL: item.photoURL || "https://example.com/default-profile.jpg"
     

    });
    
    console.log(item);
    

  }




  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">👥 User List</h1>

      <div className="divide-y">
        {userList.map((user) => (
          <div

            className="flex items-center justify-between py-4 hover:bg-slate-50 transition rounded-lg px-2"
          >
            {/* Profile Info */}
            <div className="flex items-center gap-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.username}
                  className="w-12 h-12 rounded-full object-cover border-2 border-sky-500"
                />
              ) : (
                <FaUserCircle className="text-5xl text-slate-400" />
              )}
              <div>
                <h2 className="text-lg font-semibold text-slate-800">{user.username}</h2>
                <p className="text-sm text-slate-500">{user.email}</p>
              </div>
            </div>

            {/* Status + Action */}
            <div className="flex items-center gap-4">
              <span
                className={`text-sm font-medium ${user.status === "online" ? "text-green-600" : "text-slate-400"
                  }`}
              >
                ● {user.status}
              </span>
              <button onClick={() => handleAdd(user)} className="px-3 py-1 text-sm bg-sky-600 text-white rounded-lg hover:bg-sky-700">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
