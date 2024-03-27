import React, { useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { Link, useNavigate } from 'react-router-dom'

import env from 'react-dotenv'
import { useDispatch } from 'react-redux'
import { login } from '../../../services/operations/authApi'

function LoginForm() {

    const [showPassword,setShowPassword]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [formData,setFormData]=useState({
        email:"",password:""
    })

    function changeHandler(event){
        setFormData((prev)=>(
            {
                ...prev,
                [event.target.name]:event.target.value
            }
        ))
    }
    function submitHandler(event){
        event.preventDefault();
        const {email,password}=formData
        dispatch(login(email,password,navigate))
    }

  return (
    <form onSubmit={submitHandler} className='flex flex-col w-full gap-4 mt-6'>
        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'>Email Address <sup className='text-pink-300'>*</sup></p>
            <input type="email" 
                required
                value={formData.email}
                onChange={changeHandler}
                placeholder='Enter email id'
                name='email'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px]'
            />
        </label>

        <label className='relative'>
        <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'>Password <sup className='text-pink-300'>*</sup></p>

            <input type={showPassword?("text"):("password")} 
                required
                value={formData.password}
                onChange={changeHandler}
                placeholder='Enter password'
                name='password'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px]'

            />
            <span onClick={()=>setShowPassword((prev)=>!prev)} className='absolute right-3 top-[38px] cursor-pointer'>
                {showPassword? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye  fontSize={24} fill='#AFB2BF'/>)}
            </span>

            <Link to={'/forgot-password'}>
                <p className='text-xs mt-1 text-blue-200 max-w-max ml-auto'>Forgot Password</p>
            </Link>
        </label>

        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-5'>
            Sign In
        </button>

    </form>
  )
}

export default LoginForm