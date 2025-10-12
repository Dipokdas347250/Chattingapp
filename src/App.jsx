import React from 'react'
import { createBrowserRouter ,RouterProvider  } from "react-router";
import RootlayOut from './layout/RootlayOut';
import Home from './pages/Home';
import About from './pages/About';
import Signup from './componetes/Signup';
import Signin from './componetes/Signin';


const App = () => {
 let routing = createBrowserRouter([
  {
    path: "/",
    Component: RootlayOut,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
     
    ],
  },
  {
    path: "/Signup",
    Component: Signup,
   
  },
  {
    path: "/Signin",
    Component: Signin,
   
  },
]);

  return (
   <>
   <RouterProvider router={routing}/>
   </>
  )
}

export default App