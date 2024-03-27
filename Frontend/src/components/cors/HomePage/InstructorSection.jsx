import React from 'react'
import Instructor from "../../../assets/images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { FaArrowAltCircleRight } from 'react-icons/fa'

function InstructorSection() {
  return (
    <div className='mt-20'>
        <div className='flex flex-row gap-20 items-center'>
            <div className='w-[50%]'>
                <img src={Instructor} alt="instructor image" />
            </div>

            <div className='w-[50%] flex flex-col gap-8'>
                <div className='text-4xl font-semibold w-[50%]'>Become an <HighlightText text={"Instructor"}/></div>
                <p className='font-medium text-[16px] w-[80%] text-richblack-300'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
           
                <div className='w-fit'>
                <CTAButton active={true} linkto={"/signUp"}>
                        <div className='flex flex-row gap-2 justify-center items-center'>
                            Start Teaching Today
                            <FaArrowAltCircleRight/>
                        </div>
                </CTAButton>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default InstructorSection