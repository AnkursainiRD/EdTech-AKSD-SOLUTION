import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import {toast} from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSignUpData } from '../../../slices/authSlice'
import { sendOtp } from '../../../services/operations/authApi'

function SignUpForm() {

    const [accountType,setAccountType]=useState("Student")
    const [showPassword,setShowPassword]=useState(false)
    const [showConfirmPassowrd,setShowConfirmPassword]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [formData,setFormData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
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
        if(formData.password !== formData.confirmPassword){
            toast.error("Password Not Matched")
           return
        }
        const signUpData={
            ...formData,
            accountType,
        }
        dispatch(setSignUpData(signUpData))
        dispatch(sendOtp(formData.email,navigate))
        console.log(signUpData);
    }


  return (
    <div>
        {/*Student Instructor signup area*/}
        <div className='flex bg-richblack-800 rounded-full max-w-max p-1 my-6 gap-x-1'>
                <button 
                className={`${accountType==="Student"?("bg-richblack-900 text-richblack-5"):("bg-transparent text-richblack-200")} py-2 px-5 rounded-full transition-all duration-200`} 
                onClick={()=>setAccountType("Student")}>
                    Student
                </button>
                <button 
                className={`${accountType==="Instructor"?("bg-richblack-900 text-richblack-5"):("bg-transparent text-richblack-200")} py-2 px-5 rounded-full transition-all duration-200`} 
                onClick={()=>setAccountType("Instructor")}>
                    Instructor
                </button>
        </div>

        <form onSubmit={submitHandler} className='flex flex-col gap-6'>
            <div className='flex gap-x-5'>
                <label>
                <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'>First Name <sup className='text-pink-300'>*</sup></p>
                <input type="text"
                required
                name='firstName'
                onChange={changeHandler}
                value={formData.firstName}
                placeholder='Enter your first name'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px]'
                />
                </label>

                <label>
                <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'>Last Name <sup className='text-pink-300'>*</sup></p>
                <input type="text"
                required
                name='lastName'
                onChange={changeHandler}
                value={formData.lastName}
                placeholder='Enter your last name'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px]'
                />
                </label>
            </div>

            <label>
                <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'>Email Address <sup className='text-pink-300'>*</sup></p>
                <input type="email"
                required
                name='email'
                onChange={changeHandler}
                value={formData.email}
                placeholder='Enter your email address' 
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px]'
                />
            </label>

           <div className='flex gap-x-4'>
                <label className='relative'>
                <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'>Password <sup className='text-pink-300'>*</sup></p>
                <input type={showPassword?("text"):("password")}
                required
                name='password'
                onChange={changeHandler}
                value={formData.password}
                placeholder='Enter your password'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px]'
                />

                <span onClick={()=>setShowPassword((prev)=>!prev)} className='absolute right-3 top-[38px] cursor-pointer'>
                        {showPassword? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                </span>
                </label>
                
                <label className='relative'>
                <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'>Confirm Password <sup className='text-pink-300'>*</sup></p>
                <input type={showConfirmPassowrd?("text"):("password")}
                required
                name='confirmPassword'
                onChange={changeHandler}
                value={formData.confirmPassword}
                placeholder='Confirm password'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] border-b-[1px]'
                />

                <span onClick={()=>setShowConfirmPassword((prev)=>!prev)} className='absolute right-3 top-[38px] cursor-pointer'>
                        {showConfirmPassowrd? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                </span>
                </label>
           </div>

           <button type='submit' className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-5'>
                Create Account
           </button>
        </form>
    </div>
  )
  }

export default SignUpForm