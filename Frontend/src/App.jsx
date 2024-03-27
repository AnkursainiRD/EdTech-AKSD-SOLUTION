import { useState } from 'react'
import './App.css'
import {Route,Routes,useRoutes} from "react-router-dom"
import Home from './pages/Home'
import Navbar from "./components/common/Navbar"
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'
import PrivateRoute from "./components/cors/auth/PrivateRoute"
import Error from "./pages/Error"
import Myprofile from './components/cors/dashboard/Myprofile'
import Dashboard from './pages/Dashboard'
import Settings from './components/cors/dashboard/Settings/Settings'
import EnrolledCourse from './components/cors/dashboard/EnrolledCourse'
import Cart from './components/cors/dashboard/cart/Cart'

function App() {
  
  return (
    // <div className='bg-caribbeangreen-200 w-screen min-h-screen'>

    // </div>
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>
      <Routes>
         <Route path='/' element={<Home/> }/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/signUp' element={<SignUp/>}/>
         <Route path='/forgot-password' element={<ForgotPassword/>}/>
         <Route path='/update-password/:id' element={<UpdatePassword/>}/>
         <Route path='/verifyEmail' element={<VerifyEmail/>}/>
         <Route path='/about' element={<About/>}/>
         <Route path='*' element={<Error/>}/>
         <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
              <Route path='dashboard/myProfile' element={<PrivateRoute><Myprofile/></PrivateRoute>}/>  
              <Route path='dashboard/cart' element={<PrivateRoute><Cart/></PrivateRoute>}/>
              <Route path='dashboard/settings' element={<PrivateRoute><Settings/></PrivateRoute>}/>
              <Route path='dashboard/enrolled-courses' element={<PrivateRoute><EnrolledCourse/></PrivateRoute>}/>
         </Route>
      </Routes>
    </div>
  )
}

export default App
