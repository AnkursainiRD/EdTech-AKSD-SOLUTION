import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
import { resetPassword } from '../services/operations/authApi'
import { Link } from 'react-router-dom'
import {BiArrowBack} from "react-icons/bi"

function UpdatePassword() {
    const {loading}=useSelector((state)=>state.auth)
    const [showPassword,setShowPassword]=useState(true)
    const [shorConfirmPassowrd,setShowConfirmPassword]=useState(false)
    const dispatch=useDispatch()
    const location=useLocation()
    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:""
    })

    function handleChange(e){
        setFormData((prev)=>(
            {
                ...prev,
                [e.target.name]:e.target.value
            }
        ))
    }

    function handleSubmit(e){
        e.preventDefault()
        const token=location.pathname.split("/").at(-1)
        console.log("token :",token);
        dispatch(resetPassword(formData.password,formData.confirmPassword,token))
    }

  return (
    <div>
        {loading?
        (<Spinner/>):
        (
            <div className='relative w-[30%] mx-auto'>
                <h1>Choose new Password</h1>
                <p>Almost done. Enter your new password and you are all set.</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>New Password</p>
                        <input type={showPassword? "text ":"password"}
                        required 
                        name='password'
                        value={formData.password}
                        placeholder='Enter new password'
                        onChange={handleChange}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px]'
                        />
                        <span onClick={()=>setShowPassword((prev)=>!prev)}>
                         {showPassword? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                        </span>
                    </label>

                    <label>
                        <p>Confrim New Password</p>
                        <input type={shorConfirmPassowrd? "text ":"password"}
                        required 
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        placeholder='Confirm new password'
                        onChange={handleChange}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px]'
                        />
                        <span onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                        {shorConfirmPassowrd? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                        </span>
                    </label>

                    <button type='submit' className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-5'>
                        Reset Password
                    </button>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to="/login">
                            <p className="flex items-center gap-x-2 text-richblack-5"> 
                                <BiArrowBack /> Back to Login 
                            </p>
                        </Link>
                    </div>
                </form>
            </div>
        )}
    </div>
  )
}

export default UpdatePassword