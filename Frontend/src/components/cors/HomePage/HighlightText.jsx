import React from 'react'

function HighlightText({text}) {
  return (
    <span className='font-bold text-[#00c6ff]'>
        {" "}
        {text}
    </span>
  )
}

export default HighlightText