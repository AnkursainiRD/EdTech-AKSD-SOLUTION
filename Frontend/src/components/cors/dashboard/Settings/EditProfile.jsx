import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../../../common/IconButton'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../../services/operations/settingsApi'

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "other"]

function EditProfile() {
    const {user}=useSelector((state)=>state.profile)
    const {token}=useSelector((state)=>state.auth)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit,formState:{errors}}=useForm()
   
    function submitProfileData(data){
        try {
            dispatch(updateProfile(token,data,navigate))
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
        <form onSubmit={handleSubmit(submitProfileData)}>
            <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
                <h1 className='text-lg font-semibold text-richblack-5'>Profile Information</h1>
                
                 {/*Name area*/}

                <div className='flex items-center gap-5'>
                {/*first name area*/}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="fistName" className='text-sm text-richblack-5'>
                        First Name
                    </label> 
                    <input type="text"
                     name="firstName"
                     id="firstName"
                     placeholder='Enter your first name'
                     className='bg-richblack-500 rounded-md text-richblack-5 w-ful py-1 '
                     {...register("firstName",{required:true})}
                     defaultValue={user?.firstName} />  
                     {
                        errors.firstName && (<span className='-mt-1 text-[12px] text-yellow-100'>Please Enter Your First Name</span>)
                     } 
                </div>

                { /*last name area*/}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="lastName" className='text-sm text-richblack-5'>
                        Last Name
                    </label> 
                    <input type="text"
                     name="lastName"
                     id="lastName"
                     className='bg-richblack-500 rounded-md text-richblack-5 w-full py-1 '
                     placeholder='Enter your last name'
                     {...register("lastName")}
                     defaultValue={user?.lastName} />   
                </div>
                </div>

                {/*gender or dob area*/}

                <div className='flex gap-5 items-center'>
                {/*dob area*/}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="dateOfBirth" className='text-sm text-richblack-5'>
                        Date of Birth
                    </label> 
                    <input type="date"
                     name="dateOfBirth"
                     id="dateOfBirth"
                     placeholder='Enter your Date of Birth'
                     className='bg-richblack-500 rounded-md text-richblack-5 w-ful py-1 '
                     {...register(
                        "dateOfBirth",
                     {required: {
                        value:true,
                        message:"Please Enter your Date of Birth"},

                     max:{ 
                        value: new Date().toISOString().split('T')[0],
                        message: "Date Of Birth cannot be in the future."}
                     }
                     )}

                     defaultValue={user?.additionalDetails?.dateOfBirth} />  
                     {
                        errors.firstName && (<span className='-mt-1 text-[12px] text-yellow-100'>{errors.dateOfBirth.message}</span>)
                     } 
                </div>

                { /*gender area*/}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="gender" className='text-sm text-richblack-5'>
                        Gender
                    </label> 
                    <select type="text"
                     name="gender"
                     id="gender"
                     className='bg-richblack-500 rounded-md text-richblack-5 w-full py-1 '
                     placeholder='Enter your last name'
                     {...register("gender",{required:true})}
                     defaultValue={user?.additionalDetails?.gender}>
                        
                        {
                        genders.map((gender,index)=>{
                            return(
                                <option value={gender} key={index}>
                                    {gender}
                                </option>
                            )
                        })
                        }
                    </select>   
                    {errors.gender && (
                            <span className='-mt-1 text-[12px] text-yellow-100'>
                                Please Enter Your Gender
                            </span>
                        )}
                </div>
                </div>

                {/*about and contact area*/}

                <div className='flex items-center gap-5'>
                {/*contact number area*/}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="contactNumber" className='text-sm text-richblack-5'>
                        Contact Number
                    </label> 
                    <input type="number"
                     name="contactNumber"
                     id="contactNumber"
                     placeholder='Enter your contact number'
                     className='bg-richblack-500 rounded-md text-richblack-5 w-ful py-1 '
                     {...register("contactNumber",
                     {
                        required: {
                            value: true,
                            message: 'Please Enter Your Contact Number',
                        },
                        maxLength: { value: 12, message: 'Invalid Contact Number' },
                        minLength: { value: 10, message: 'Invalid Contact Number' },
                     })}
                     defaultValue={user?.additionalDetails?.contactNumber} />  
                     {
                        errors.contactNumber && (<span className='-mt-1 text-[12px] text-yellow-100'>Please Enter Your Contact Number</span>)
                     } 
                </div>

                { /*about area*/}
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor="about" className='text-sm text-richblack-5'>
                        About 
                    </label> 
                    <input type="text"
                     name="about"
                     id="about"
                     className='bg-richblack-500 rounded-md text-richblack-5 w-full py-1 '
                     placeholder='Enter about yourself'
                     {...register("about",{required:true})}
                     defaultValue={user?.additionalDetails?.about} />   
                      {
                        errors.about && (<span className='-mt-1 text-[12px] text-yellow-100'>Please Enter about yourself</span>)
                     } 
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

export default EditProfile