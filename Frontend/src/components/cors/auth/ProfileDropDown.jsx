import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { logout } from '../../../services/operations/authApi'
import useOnClickOutside from '../../../hooks/useOnClickOutside'

function ProfileDropDown() {
  const [open,setOpen]=useState(false)
  const [dp,setDp]=useState("")
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const ref=useRef()
  const {user}=useSelector((state)=>state.profile)

  useOnClickOutside(ref,()=>setOpen(false))
  if(!user) return null

  return (
    <div>
        <button className='relative' onClick={()=>setOpen(true)}>
            <div className='flex items-center gap-1'>
              <img src={user?.image} alt={`profile-${user?.firstName}`} className='aspect-square w-[30px] rounded-full object-cover' />
              <AiOutlineCaretDown className="text-sm text-richblack-100" />
            </div>
            {
              open &&(
                <div onClick={(e)=>e.stopPropagation()}  ref={ref} className='absolute top-[6.5%] right-[9%] z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800'>
                  <Link to={"/dashboard/myProfile"} onClick={()=>setOpen(false)} className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
                    <VscDashboard className='text-lg'/>
                    Dashboard
                  </Link>

                  <div onClick={()=>{dispatch(logout(navigate)); setOpen(false)}} className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25' >
                      <VscSignOut className='text-lg'/>
                      Logout
                  </div>
                </div>
              )
            }
        </button>
    </div>
  )
}

export default ProfileDropDown