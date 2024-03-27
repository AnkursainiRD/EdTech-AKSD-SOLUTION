import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import AKSDLOGO from "../../assets/images/AKSDLOGO.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import {useSelector} from "react-redux"
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../cors/auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { catalogData } from '../../services/Apis'
import {IoIosArrowDown} from "react-icons/io"

 function Navbar() {

  const {token}=useSelector((state)=>state.auth);
  const {user}=useSelector((state)=>state.profile);
  const {totalItems}=useSelector((state)=>state.cart)


  const location=useLocation()
  const matchRoute=(route)=>{
    return matchPath({path:route}, location.pathname)
  }

  const [subLinks,setSubLinks]=useState([])
  useEffect(()=>{
    getSubLinks()
  },[])

  async function getSubLinks(){
    try {
      const result=await apiConnector("GET",catalogData.CATALOGPAGEDATA_API);
      setSubLinks(result.data.data)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            <Link to={'/'}>
              <h1 className='text-white font-bold text-4xl'>AKSD</h1>
            </Link>

            {/*nav links*/}
            <nav>
              <ul className='flex gap-x-6 text-richblack-25'>
                  {
                    NavbarLinks.map((link,index)=>{
                      return <li key={index}>
                          {
                            link.title === "Catalog"? 
                            (<div className=' relative flex items-center gap-1 group'>
                              <p>{link.title}</p>
                              <IoIosArrowDown/>

                              <div className='invisible z-30 absolute left-[50%] top-[50%] flex translate-x-[-50%] translate-y-[80%] flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]'>
                                <div className='absolute left-[50%] top-0 translate-y-[-45%] translate-x-[80%] h-6 w-6 rotate-45 rounded bg-richblack-5'></div>
                                  {subLinks.length? 
                                  ( subLinks.map((link,index)=>(
                                    <Link to={`${link.categoryName}`} key={index}>
                                      {link.categoryName}
                                    </Link>
                                  )))
                                  :(<div></div>)}
                               </div>
                            </div>): 
                            (
                              <Link to={link.path}>
                                <p className={`${matchRoute(link?.path)? "text-yellow-25":"text-richblack-25"}`}>{link.title}</p>
                              </Link>
                            )
                          }
                        </li>
                    })
                  }
              </ul>
            </nav>

            {/*login signup*/}
            <div className='flex  gap-x-4 items-center'>
                  {user && user?.accountType !="Instructor" &&
                    (
                      <Link to={'/dashboard/cart'} className='relative'>
                          <AiOutlineShoppingCart/>
                          {
                            totalItems>0 && <span>{totalItems}</span>
                          }
                      </Link>
                    )
                  }

                  {
                    token===null && 
                    (
                      <Link to={'/login'} className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-50 rounded-md'>
                        <button>Login</button>
                      </Link>
                    )
                  }
                  {
                     token===null && 
                     (
                       <Link to={'/signUp'} className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-50 rounded-md'>
                         <button>SignUp</button>
                       </Link>
                     )
                  }

                  {
                    token !==null && <ProfileDropDown/>
                  }
            </div>
        </div>
    </div>
  )
}

export default Navbar