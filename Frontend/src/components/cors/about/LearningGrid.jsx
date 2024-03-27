import React from 'react'
import { LearningGridArray } from '../../../data/LearningGridArray'
import HighlightText from '../HomePage/HighlightText'
import CTAButton from '../HomePage/Button'

function LearningGrid() {
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 mb-auto p-5 w-fit'>
        {
            LearningGridArray.map((card,index)=>{
                return(
                    <div className={`${index===0 && "col-span-2 lg:h-[300px] p-5 bg-transparent"} ${card.order % 2 === 1 ? "bg-richblack-700 h-[294px] p-5":"bg-richblack-800 p-5" } ${card.order===3 && "lg:col-start-2"}`} key={index}>
                        {
                            card.order<0?
                            (
                             <div className='xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0'>
                                    <div className='text-4xl font-semibold'>
                                    {card.heading}
                                    <HighlightText text={card.highlightText}/>
                                </div>
                                <p className='font-medium'>{card.description}</p>
                                <div className='w-fit mt-2'>
                                    <CTAButton active={true} linkto={card.BtnLink}>
                                    {card.BtnText}
                                </CTAButton>
                                </div>
                            </div>
                            ):
                            (
                             <div className='flex flex-col gap-8 p-7'>
                                <h1 className='text-lg font-semibold text-richblack-5'>{card.heading}</h1>
                                <p className='text-richblack-300 font-medium'>{card.description}</p>
                            </div>
                            )
                        }
                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid