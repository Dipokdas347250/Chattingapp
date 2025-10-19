import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../firebase.Config';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { getDatabase, ref, set } from "firebase/database";






const Signup = () => {
    const auth = getAuth(app);
    const db = getDatabase();


    let [loading, setLoading] = useState(false)

    let [info, setInfo] = useState({
        name: "",
        lname: "",
        email: "",
        number: "",
        password: "",
        cpassword: ""
    })

    let [errors, setErrors] = useState({
        name: "",
        lname: "",
        email: "",
        number: "",
        password: "",
        cpassword: ""
    })

    let navigate = useNavigate()
    let handlesignup = () => {

        setLoading(true)


        if (!info.name) {
            setErrors((prev) => ({ ...prev, name: "First name is required", }));
        } else if (!info.lname) {
            setErrors((prev) => ({ ...prev, lname: "Last name is required", }));
        } else if (!info.email) {
            setErrors((prev) => ({ ...prev, email: "Email is required", }));
        } else if (!info.number) {
            setErrors((prev) => ({ ...prev, number: "Number is required", }));
        } else if (!info.password) {
            setErrors((prev) => ({ ...prev, password: "Password is required", }));
        } else if (!info.cpassword) {
            setErrors((prev) => ({ ...prev, cpassword: "Confirm password is required", }));
        } else {

        }

        createUserWithEmailAndPassword(auth, info.email, info.password)
            .then((userCredential) => {
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        updateProfile(auth.currentUser, {
                            displayName: `${info.name + " " + info.lname}`, photoURL: "https://example.com/jane-q-user/profile.jpg"
                        }).then(() => {
                            const user = userCredential.user;
                            set(ref(db, 'users/' + user.uid), {
                                username: info.name + " " + info.lname,
                                email: info.email,
                                phone: info.number,
                                photoURL: "https://example.com/jane-q-user/profile.jpg"
                                
                            });
                            setLoading(false)
                            toast.success('Successfully signed up! Verification email sent.');
                            (setErrors((prev) => ({ ...prev, email: "" })));
                            setTimeout(() => {

                                navigate("/Signin")
                            })
                            

                        });

                    });
                // Signed in 
                // console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false)

                setErrors((prev) => ({ ...prev, email: errorMessage, }));
                toast.error('This email is already in use!');
            });

    }




    return (
        <>
            <div className="max-w-4xl max-sm:max-w-lg mx-auto p-6 mt-6 border">
                <div className="text-center mb-12 sm:mb-16">

                    <h4 className="text-slate-600  text-2xl mt-6">Sign up into your account</h4>
                </div>
                <form>
                    <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">
                                First Name
                            </label>
                            <input onChange={(e) => setInfo({ ...info, name: e.target.value })(setErrors((prev) => ({ ...prev, name: "" })))}
                                name="name"
                                type="text"
                                className={`bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent transition-all ${errors.name ? "border-red-500 border-2 placeholder:text-red-500" : "border-slate-200 border "}`}
                                placeholder="Enter name"
                            />
                        </div>
                        <div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">
                                Last Name
                            </label>
                            <input onChange={(e) => setInfo({ ...info, lname: e.target.value })(setErrors((prev) => ({ ...prev, lname: "" })))}
                                name="lname"
                                type="text"
                                className={`bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent transition-all ${errors.lname ? "border-red-500 border-2 placeholder:text-red-500" : ""}`} placeholder="Enter last name"
                            />
                        </div>
                        <div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">
                                Email Id
                            </label>
                            <input onChange={(e) => setInfo({ ...info, email: e.target.value })(setErrors((prev) => ({ ...prev, email: "" })))}
                                name="email"
                                type="text"
                                className={`bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent transition-all ${errors.email ? "border-red-500 border-2 placeholder:text-red-500" : ""}`} placeholder="Enter email"
                            />
                        </div>
                        <div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">
                                Mobile No.
                            </label>
                            <input onChange={(e) => setInfo({ ...info, number: e.target.value })(setErrors((prev) => ({ ...prev, number: "" })))}
                                name="number"
                                type="number"
                                className={`bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent transition-all ${errors.number ? "border-red-500 border-2 placeholder:text-red-500" : ""}`} placeholder="Enter mobile number"
                            />
                        </div>
                        <div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">
                                Password
                            </label>
                            <input onChange={(e) => setInfo({ ...info, password: e.target.value })(setErrors((prev) => ({ ...prev, password: "" })))}
                                name="password"
                                type="password"
                                className={`bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent transition-all ${errors.password ? "border-red-500 border-2 placeholder:text-red-500" : ""}`} placeholder="Enter password"
                            />
                        </div>
                        <div>
                            <label className="text-slate-900 text-sm font-medium mb-2 block">
                                Confirm Password
                            </label>
                            <input onChange={(e) => setInfo({ ...info, cpassword: e.target.value })(setErrors((prev) => ({ ...prev, cpassword: "" })))}
                                name="cpassword"
                                type="password"
                                className={`bg-slate-100 w-full text-slate-900 text-sm px-4 py-3 rounded-md focus:bg-transparent transition-all ${errors.cpassword ? "border-red-500 border-2 placeholder:text-red-500" : ""}`} placeholder="Enter confirm password"
                            />
                        </div>
                    </div>
                    <div className="mt-12">

                        <button onClick={handlesignup}
                            type="button"
                            className='mx-auto relative  block min-w-32 py-3 px-6 text-sm font-medium tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer'
                        >
                            {loading ? "Loading..." : "Sign up"}

                        </button>

                    </div>

                </form>

            </div>

        </>
    )
}

export default Signup