import React from 'react'
import Logo1 from "../../../assets/images/Logo1.svg"
import Logo2 from "../../../assets/images/Logo2.svg"
import Logo3 from "../../../assets/images/Logo3.svg"
import Logo4 from "../../../assets/images/Logo4.svg"
import timelineImg from "../../../assets/images/TimelineImage.png"

function TimelineSection() {

    const timeline=[
        {
            logo:Logo1,
            heading:"AKSD",
            description:"Fully committed to the success company"
        },
        {
            logo:Logo2,
            heading:"Responsibility",
            description:"Fully committed to the success company"
        },
        {
            logo:Logo3,
            heading:"Flexibility",
            description:"Fully committed to the success company"
        },
        {
            logo:Logo4,
            heading:"Clean Code",
            description:"Fully committed to the success company"
        }
    ]
  return (
    <div>
        <div className='flex flex-col lg:flex-row gap-20 mg-20 items-center'>
            <div className='lg:w-[45%] flex flex-col gap-14 lg:gap-3'>
                {
                    timeline.map((elem,index)=>
                    { return(
                        <div className='flex flex-col lg:gap-3' key={index}>
                            <div className='flex gap-6'>
                            <div className='w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]'> <img src={elem.logo} alt="logo" /></div>
                            <div>
                                <h2 className='font-semibold text-[18px] '>{elem.heading}</h2>
                                <p className='text-base '>{elem.description}</p>
                            </div>
                            </div>
                            {index<3?<span className='ml-5 w-1 h-7 border-2 border-richblack-50 border-dashed '></span> :""}
                            
                        </div>
                    )})
                }
            </div>

            <div className='relative shadow-blue-200'>
                <img className='shadow-[rgba(0,195,255,0.5)_20px_0px_64px_10px]' src={timelineImg} alt="timelineimage" />

                <div className='absolute bg-caribbeangreen-600 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='text-3xl  font-bold'>10</p>
                        <p className='text-caribbeangreen-100 text-sm'>years of experience</p>
                    </div>
                    
                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl  font-bold'>120</p>
                        <p className='text-caribbeangreen-100 text-sm'>Type of cources</p>
                    </div>
                </div>
            </div>    
        </div>
    </div>
  )
}

export default TimelineSection