import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore" 
import HighlightText from './HighlightText'
import CourseCard from './CourseCard'

const tabName=["Free","New to coding","Most popular","Skills paths","Career paths"]
function ExploreMore() {

    const [currentTab,setCurrentTab]=useState(tabName[0])
    const [courses,setCourses]=useState(HomePageExplore[0].courses)
    const [currentCard,setCurrentCard]=useState(HomePageExplore[0].courses[0].heading)

    const setMyCards=(value)=>{
        setCurrentTab(value);
        const result=HomePageExplore.filter((course)=>course.tag=== value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses.heading)
    }
  
  return (
    <div className='mt-11'>
        <div className='text-center text-4xl font-semibold'>
            Unlock the <HighlightText text={"Power of Code"}/>
        </div>

        <p className='text-center text-richblack-300 text-sm text-[16px]'>
            Learn to build anything you can imagine
        </p>

        <div className='flex flex-row mb-5 border-richblack-100 mt-5 px-2 py-2'>
            { tabName.map((elem,index)=>{
                return(
                    <div className={`text-[16px] flex flex-row items-center gap-2 ${currentTab==elem? "bg-richblue-900 text-richblack-5" :"text-richblack-200"} 
                    rounded-full cursor-pointer transition-all duration-200 hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                    key={index}
                    onClick={()=>setMyCards(elem)}>
                        {elem}
                    </div>
                )
            })}
        </div>
            
        <div className='lg:h-[150px] '>
            <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
                {courses.map((elem,index)=>{
                    return(
                        <CourseCard key={index} cardData={elem} currentCard={currentCard} setCurrentCard={setCurrentCard}/>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default ExploreMore