import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import countrycode from "../../data/countrycode.json"

function ContactUsForm() {
    const[loading,setLoading]=useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors,isSubmitSuccessful}
    }=useForm()

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNumber:""
            })
        }
    },[reset,isSubmitSuccessful])

    async function submitForm(data){
        console.log(data);
    }
    
  return (
    <form onSubmit={handleSubmit(submitForm)}>
        <div className='flex flex-col'>
        <div className='flex gap-5'>
            <div className='flex flex-col'>
                <label htmlFor='firstName'>First Name</label>
                <input type="text"
                name='firstName'
                id='firstName'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '
                placeholder='Enter first name'
                {...register("firstName",{required:true})} />
                {
                    errors.firstName &&(
                        <span>Please enter your name</span>
                    )
                }
            </div>

            <div className='flex flex-col'>
                <label htmlFor='lastName'>Last Name</label>
                <input type="text"
                name='lastName'
                id='lastName'
                placeholder='Enter last name'
                className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                {...register("lastName")} />
            </div>
        </div>

        <div className='flex flex-col'>
            <label htmlFor="email">Email Address</label>
            <input type="email"
            name='email'
            id='email'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            placeholder='Enter your email'
            {...register("email",{required:true})} />
            {
                errors.email &&(
                    <span>Please enter your email address</span>
                )
            }
        </div>

        <div className='flex flex-col gap-2 text-black'>
            <label htmlFor="phoneNumber" className='text-white'>Phone Number</label>
            <div className='flex gap-5'>

                {/*dropdwon*/}
                    <select name="dropdown" id="dropdown" className=' w-[80px] bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[8px]' {...register("countryCode",{required:true})}>
                        {
                            countrycode.map((data,index)=>{
                                return(
                                    <option value={data.code} key={index} className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] '                                    >
                                        {data.code} - {data.country}
                                    </option>
                                )
                            })
                        }
                    </select>
                

                {/*input field*/}

                    <input type="number"
                    id='phoneNumber'
                    placeholder='+91 8744598745'
                    className=' w-[calc(100%-90px)]  bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px]'
                    {...register("phoneNumber",
                    {required:{value:true,message:"Please Enter Phone Number"},
                     maxLength:{value:10,message:"Invalid Phone Number"},
                     minLength:{value:8,message:"Invalid Phone Number"}
                     })} />
            </div>
            {
                errors.phoneNumber&&(
                    <span>{errors.phoneNumber.message}</span>
                )
            }
        </div>

        <div className='flex flex-col'>
            <label htmlFor="message">Message</label>
            <textarea name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder='Enter your message here..'
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            {...register("message",{required:true})}/>
            {
                errors.message &&(
                    <span>Please enter your message</span>
                )
            }
        </div>

        <button type='submit' className='w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-5'>
            Send Message
        </button>
        </div>
    </form>
  )
}

export default ContactUsForm