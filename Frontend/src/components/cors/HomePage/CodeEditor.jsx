import React from 'react'
import CTAButton from './Button'
import HighlightText from './HighlightText'
import { FaArrowRight } from 'react-icons/fa'
import {TypeAnimation} from 'react-type-animation'

function CodeEditor({position,heading,subHeading,ctaBtn1,ctaBtn2,codeBlock,bgGradient,codeColor}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`}>
        {/*section 1*/}
        <div className='w-[50%] flex flex-col gap-8'>
                {heading}
                <div className='ring-richblack-300 '>
                    {subHeading}
                </div>
                <div className='flex gap-7 mt-7'>
                    <CTAButton active={ctaBtn1.active} linkto={ctaBtn1.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctaBtn1.text}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton active={ctaBtn2.active} linkto={ctaBtn2.linkto}>
                            {ctaBtn2.text}
                    </CTAButton>
                </div>
        </div>

         {/*Section 2*/}
         <div className='h-fit  code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]'>
         {/* <div className='absolute h-[250px] w-[250px] rounded-[58%_43%_33%_64%_/_50%_38%_53%_50%] bg-[#ff7b00] mix-blend-multiply filter blur-[20px]' >Hi</div> */}
         <div className={`${bgGradient} absolute h-[100%] bg-transparent code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6  w-[100%] lg:w-[470px]`}></div>
                    <div className='text-center flex flex-col z-20  w-[10%] text-richblack-400 font-bold'>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                    </div>
                    
                    <div className={`w-[80%] flex flex-col z-30 gap-2 font-bold font-mono pr-2 ${codeColor}`}>
                        <TypeAnimation sequence={[codeBlock,5000,""]} repeat={Infinity} cursor={true} style={
                        {
                            whiteSpace: "pre-line",
                            display: "block",
                        }
                    }
                    omitDeletionAnimation={true}/>
                    </div>
                    
                </div>
    </div>
  )
}

export default CodeEditor