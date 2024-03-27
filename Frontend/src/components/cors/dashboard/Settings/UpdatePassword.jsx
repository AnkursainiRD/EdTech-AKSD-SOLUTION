import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {AiOutlineEyeInvisible,AiOutlineEye} from "react-icons/ai"
import IconButton from '../../../common/IconButton'
import { updatePassword } from '../../../../services/operations/authApi'

function UpdatePassword() {
    const [showOldPassword,setShowOldPassword]=useState(false)
    const [showNewPassword,setShowNewPassword]=useState(false)
    const {register,handleSubmit,formState:{errors}}=useForm()
    const {token}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    function submitPassword(data){
        console.log(data);
        dispatch(updatePassword(token,data))
        .then(()=>navigate("/dashboard/myProfile"))
    }
  return (
    <>
        <form onSubmit={handleSubmit(submitPassword)}>
            <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
            <h2 className='text-lg font-semibold text-richblack-5'>Password</h2>
            <div className='flex items-center gap-5'>
                {/*old password area*/}
                <div className='flex flex-col gap-2 lg:w-[48%] relative'>
                    <label htmlFor='oldPassword'>  
                        <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'>Current Password</p>
                    </label>

                    <input type={showOldPassword?("text"):("password")} 
                        placeholder='Enter current password'
                        name='oldPassword'
                        id='oldPassword'
                        {...register('oldPassword', { required: true })}
                        className='bg-richblack-500 rounded-md text-richblack-5 w-full py-1 '
                    />

                    <span onClick={()=>setShowOldPassword((prev)=>!prev)} className='absolute right-3 top-[38px] cursor-pointer'>
                        {showOldPassword? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye  fontSize={24} fill='#AFB2BF'/>)}
                    </span>

                    {errors.oldPassword && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please Enter Your Current Password
                            </span>
                        )}
                </div>
     

                { /*new password area*/}
                <div className='flex flex-col gap-2 lg:w-[48%] relative'>
                    <label htmlFor='newPassowrd'>  
                        <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'>New Password</p>
                    </label>

                    <input type={showNewPassword?("text"):("password")} 
                        placeholder='Enter new password'
                        name='newPassowrd'
                        id='newPassowrd'
                        {...register('newPassowrd', { required: true })}
                        className='bg-richblack-500 rounded-md text-richblack-5 w-full py-1 '
                    />

                    <span onClick={()=>setShowNewPassword((prev)=>!prev)} className='absolute right-3 top-[38px] cursor-pointer'>
                        {showOldPassword? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye  fontSize={24} fill='#AFB2BF'/>)}
                    </span>

                    {errors.newPassword && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please Enter Your New Password
                            </span>
                        )}
                </div>
                </div>
            </div>

            <div className='flex justify-end items-center gap-2'>
                <button
                    onClick={() => {
                        navigate('/dashboard/my-profile')
                    }}
                    className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
                >
                    Cancel
                </button>
                <IconButton type='submit' text='Save' />
            </div>
        </form>
    </>
  )
}

export default UpdatePassword