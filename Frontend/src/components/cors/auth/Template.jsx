import React from 'react'
import frame from "../../../assets/images/frame.png"
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import {FcGoogle} from "react-icons/fc"

function Template({title,des1,des2,image,formType}) {
  return (
    <div className='mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12 mt-11'>
        <div className='w-11/12 max-w-[450px]'>
            <h1 className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem] mb-4'>{title}</h1>
            <p className='text-[1.11rem] leading-[1.625rem]'>
                <span className='text-richblack-100'>{des1}</span> <br />
                <span className='text-blue-100 italic'>{des2}</span>
            </p>

            {formType ==="signUp"?
            (<SignUpForm/>):
            (<LoginForm/>)}

            <div className='flex flex-row w-full items-center my-4 gap-x-2'>
                <div className='h-[1px] bg-richblack-500 w-full'></div>
                <p className='text-richblack-200 font-medium leading-[1.375rem]'>OR</p>
                <div className='h-[1px] bg-richblack-500 w-full'></div>
            </div>

            <button className='flex items-center gap-2 w-full justify-center rounded-[8px] text-richblack-100 font-medium border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6'>
                <FcGoogle/>
                <p >Sign Up with Google</p>
            </button>
        </div>

        <div className='relative w-11/12 max-w-[450px]'>
            <img src={frame} alt=""
            width={558}
            height={584}
            loading='lazy'
            />

            <img className='absolute -top-4 right-4' src={image} alt=""
            width={558}
            height={490}
            loading='lazy'
            />
        </div>
    </div>
  )
}

export default Template