import React from 'react'

function IconButton({text,onClick,children,disabled,outline=false,customClasess,type}) {
  return (
    <button
    className='flex items-center gap-2 w-fit bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] '
    disabled={disabled}
    onClick={onClick}
    type={type}
    >
        {
            children ?
            (
            <>
            <span>{text}</span>
            {children}
            </>
            ):
            (text)
        }
    </button>
  )
}

export default IconButton