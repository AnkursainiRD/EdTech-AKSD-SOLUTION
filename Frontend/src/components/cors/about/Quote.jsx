import React from 'react'
import HighlightText from '../HomePage/HighlightText'

function Quote() {
  return (
    <div className='text-xl md:text-3xl font-semibold mx-auto py-5 pb-20 text-center text-white'>
        We are passionate about revolutionize the way we learn. Our innovative platform 
        <HighlightText text={"combine technology"}/>
        <span className='text-yellow-50 '>
            {" "}
            expertise
        </span>
        , and community to create an
        <span className='text-yellow-50  bg-clip-text font-bold'>
            {" "}
            unparalleled  educational expertise
        </span>
    </div>
  )
}

export default Quote