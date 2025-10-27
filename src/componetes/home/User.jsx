import React, { useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import Userlist from "./Userlist";
import FriendList from "./Friendlist";
import { useSelector } from "react-redux";
import { getAuth, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Friend from "../message/Friend";

const user = () => {
  let user = useSelector((state) => state.user.value);
  const [activePage, setActivePage] = useState("home");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // 🔸 Popup state
  const auth = getAuth();

  let navigate = useNavigate();
  let selector = useSelector((state) => state.messageselect.value);


  const sendMessage = () => {
    if (text.trim() === "") return;
    setMessages([...messages, { from: "me", text }]);
    setText("");
  };

  const handleLogout = () => {

    signOut(auth).then(() => {
      localStorage.removeItem("user");
      window.location.reload();
      navigate("/signin");
    }).catch((error) => {
      toast.error('Error logging out: ' + error.message);
    });
    setShowLogoutPopup(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* === Sidebar === */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full flex flex-col items-center gap-6 py-4 px-2 text-2xl text-slate-600 z-50">
        <button
          onClick={() => setActivePage("home")}
          className={`hover:text-sky-600 transition-colors duration-200 cursor-pointer ${activePage === "home" ? "text-sky-600" : ""
            }`}
        >
          <FaHome />
        </button>

        <button
          onClick={() => setActivePage("message")}
          className={`hover:text-sky-600 transition-colors duration-200 cursor-pointer ${activePage === "message" ? "text-sky-600" : ""
            }`}
        >
          <MdMessage />
        </button>

        <button
          onClick={() => setActivePage("profile")}
          className={`hover:text-sky-600 transition-colors duration-200 cursor-pointer ${activePage === "profile" ? "text-sky-600" : ""
            }`}
        >
          <FaUser />
        </button>
      </div>

      {/* === Main Content === */}
      <div className="flex-1 ml-20 p-6">
        {/* 🏠 Home */}
        {activePage === "home" && (
          <div>
            <Userlist />
            <FriendList />
          </div>
        )}

        {/* 💬 Message */}

        {/* {activePage === "message" && (
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-[70vh]">
            <h1 className="text-2xl font-bold mb-4 text-slate-800">💬 Message</h1>

            <div className="flex-1 overflow-auto mb-4 space-y-2">
              {messages.length === 0 && (
                <p className="text-center text-slate-400 text-sm">
                  Start messaging...
                </p>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.from === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg text-sm ${
                      msg.from === "me"
                        ? "bg-sky-600 text-white rounded-br-none"
                        : "bg-slate-100 text-slate-800 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
              >
                Send
              </button>
            </div>
          </div>
        )} */}

        {activePage === "message" && (
          <div className="flex gap-4">
            {/* 👤 User Section */}
            <div className="bg-white rounded-lg shadow-md p-6 w-[250px] h-[70vh] flex flex-col">
              <h1 className="text-xl font-bold mb-4 text-slate-800">👥 Friend</h1>
              <Friend />


            </div>

            {/* 💬 Message Section */}
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-[70vh] flex-1">
              <h1 className="text-2xl font-bold mb-4 text-slate-800">💬 {selector.name}</h1>

              <div className="flex-1 overflow-auto mb-4 space-y-2">
                <div className="h-screen overflow-y-auto p-4 pb-36">
                      < div className="flex justify-end mb-4 cursor-pointer" >
                        <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                          <div>
                            <p>
                            
                            </p>
                            <p></p>
                          </div>
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                          <img
                            src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                            alt="My Avatar"
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                      </div>
                      

                      <div className="flex mb-4 cursor-pointer">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                          <img
                            src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                            alt="User Avatar"
                            className="w-8 h-8 rounded-full"
                          />
                        </div>
                        <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                          <div>
                            <p className="text-gray-700">dfhsdg</p>
                            <p></p>
                          </div>
                        </div>
                      </div>
                  



                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="Type a message..."
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}


        {/* 👤 Profile */}
        {activePage === "profile" && (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={user?.photoURL}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover border-2 border-sky-500"
              />
              <div>
                <h2 className="text-xl font-semibold text-slate-800">
                  {user?.displayName}
                </h2>
                <p className="text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500 uppercase mb-1">Status</p>
                <p className="text-green-600 font-medium">Online</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase mb-1">About</p>
                <p className="text-slate-600 text-sm">
                  This is a simple profile page created with Tailwind CSS and React.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowLogoutPopup(true)}
              className="mt-6 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* 🔸 Logout Popup Modal */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Confirm Logout</h2>
            <p className="text-slate-600 mb-6">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex justify-between gap-3">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="w-1/2 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 text-slate-700"
              >
                Close
              </button>
              <button
                onClick={handleLogout}
                className="w-1/2 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default user;
