import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from 'react-hot-toast';
import app from '../firebase.Config';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { userInfo } from '../slices/slice';
import { useNavigate } from 'react-router';
import { getDatabase, ref, set } from "firebase/database";


const Signin = () => {
    const auth = getAuth(app);
    const db = getDatabase();
    let dispatch = useDispatch()
    let [data, setData] = useState({
        email: "",
        password: "",

    });
    let navigate = useNavigate()

    // let [error , setError] = useState({
    //     email:"",
    //     password: "",
    // })

    // if(data.email){
    //     setError((prev) => ({ ...prev, name: "email is required", }));
    // }

    let handleChange = (e) => {
        let { name, value } = e.target
        setData((prve) => ({
            ...prve, [name]: value
        }))
    };

    let handlesubmit = (e) => {
        e.preventDefault()
        if (data.email && data.password) {
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    dispatch(userInfo(user))
                    localStorage.setItem("user", JSON.stringify(user))
                    if (!user.emailVerified) {
                        navigate("/signin")
                        toast.error("Please verify your email")
                       
                    } else {
                        toast.success(' Login Successfully ');
                        setTimeout(() => {
                            navigate("/")
                        }, 2000)
                    }


                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                });
        } else {
            toast.error('This email is already in use!');
        }

    }

    let handlegoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {

                const user = result.user;
                set(ref(db, 'users/' + user.uid), {
                    username: user.displayName,
                    email: user.email,
                    phone: user.phoneNumber,
                    photoURL: user.photoURL
                });
                dispatch(userInfo(user))
                localStorage.setItem("user", JSON.stringify(user))
                toast.success(' Login Successfully ');
                setTimeout(() => {

                    navigate("/")
                }, 2000)
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;

            });
    }


    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">




                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form onSubmit={handlesubmit} className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input onChange={handleChange}
                                        type="email"
                                        name="email"
                                        id="email"
                                        className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                        placeholder="name@company.com"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input onChange={handleChange}
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                                required=""
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="remember"
                                                className="text-gray-500 dark:text-gray-300"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <button onClick={handlegoogle} className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100 cursor-pointer">
                                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_17_40)">
                                            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                            <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                            <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_17_40">
                                                <rect width="48" height="48" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Continue with Google
                                </button>
                                <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100 cursor-pointer">
                                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.095 43.5014C33.2083 43.5014 43.1155 28.4946 43.1155 15.4809C43.1155 15.0546 43.1155 14.6303 43.0867 14.2079C45.0141 12.8138 46.6778 11.0877 48 9.11033C46.2028 9.90713 44.2961 10.4294 42.3437 10.6598C44.3996 9.42915 45.9383 7.49333 46.6733 5.21273C44.7402 6.35994 42.6253 7.16838 40.4198 7.60313C38.935 6.02428 36.9712 4.97881 34.8324 4.6285C32.6935 4.27818 30.4988 4.64256 28.5879 5.66523C26.677 6.68791 25.1564 8.31187 24.2615 10.2858C23.3665 12.2598 23.1471 14.4737 23.6371 16.5849C19.7218 16.3885 15.8915 15.371 12.3949 13.5983C8.89831 11.8257 5.81353 9.33765 3.3408 6.29561C2.08146 8.4636 1.69574 11.0301 2.2622 13.4725C2.82865 15.9148 4.30468 18.0495 6.38976 19.4418C4.82246 19.3959 3.2893 18.9731 1.92 18.2092V18.334C1.92062 20.6077 2.7077 22.8112 4.14774 24.5707C5.58778 26.3303 7.59212 27.5375 9.8208 27.9878C8.37096 28.3832 6.84975 28.441 5.37408 28.1567C6.00363 30.1134 7.22886 31.8244 8.87848 33.0506C10.5281 34.2768 12.5197 34.9569 14.5747 34.9958C12.5329 36.6007 10.1946 37.7873 7.69375 38.4878C5.19287 39.1882 2.57843 39.3886 0 39.0777C4.50367 41.9677 9.74385 43.5007 15.095 43.4937" fill="#1DA1F2" />
                                    </svg>
                                    Continue with Twitter
                                </button>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700    font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 outline-none cursor-pointer"
                                >
                                    Sign in
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?{" "}
                                    <Link
                                        to='/signup'
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500 "
                                    >
                                        Sign up
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

export default Signin