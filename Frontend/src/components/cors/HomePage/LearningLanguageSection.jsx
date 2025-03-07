import React from 'react'
import HighlightText from './HighlightText'
import Know_your_progress from "../../../assets/images/Know_your_progress.png"
import Compare_with_others from "../../../assets/images/Compare_with_others.png"
import Plan_your_lessons from "../../../assets/images/Plan_your_lessons.png"
import CTAButton from './Button'

function LearningLanguageSection() {
  return (
    <div className='mt-[130px] mb-32'>
        <div className='flex flex-col gap-5 items-center'>
            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife for <HighlightText text={" learning any language."}/>
            </div>

            <div className='text-center text-richblack-600 mx-auto text-base w-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-row  items-center mt-5 justify-center'>
                <img className='object-contain -mr-28' src={Know_your_progress} alt="porgress image" />
                <img className='object-contain -mr-32' src={Compare_with_others} alt="compare image" />
                <img className='object-contain' src={Plan_your_lessons} alt="planlesson image" />
            </div>

            <div className='w-fit'>
                <CTAButton active={true} linkto={"/signUp"}>
                    <div>Learn more</div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearningLanguageSection