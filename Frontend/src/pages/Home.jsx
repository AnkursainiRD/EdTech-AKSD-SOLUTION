import React from 'react'
import {FaArrowRight} from "react-icons/fa"
import { Link } from 'react-router-dom'
import HighlightText from '../components/cors/HomePage/HighlightText'
import CTAButton from '../components/cors/HomePage/Button'
import banner from "../assets/images/banner.mp4"
import CodeEditor from '../components/cors/HomePage/CodeEditor'
import TimelineSection from '../components/cors/HomePage/TimelineSection'
import LearningLanguageSection from '../components/cors/HomePage/LearningLanguageSection'
import InstructorSection from "../components/cors/HomePage/InstructorSection"
import Footer from '../components/common/Footer.jsx'
import ExploreMore from '../components/cors/HomePage/ExploreMore.jsx'

function Home() {
  return (
    <div>
        {/*Section 1*/}
        {/* {console.log(process.env.REACT_APP_BASE_URL)} */}
        <div className='relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between'>
            <Link to={"/signUp"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95'>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                        <p>Become and Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
                </Link>

            <div className='flex flex-row gap-2 mt-7 text-4xl font-semibold'>
                <h1>Ignite Your Passion for </h1>
                <HighlightText text="Programming"/>
            </div>
            <div className='w-[90%] text-center mt-5  text-richblack-300'>
            Decode the Challenges, Craft the Solutions with a diverse range of expert-led coding courses, meticulously crafted to cater to beginners and seasoned professionals alike, we provide a comprehensive learning experience tailored to your individual goals and aspirations Code Fearlessly, Innovate Relentlessly with AKSD...
            </div>

            <div className='flex mt-8 gap-8 flex-row items-center'>
                    <CTAButton active={true} linkto={"/signUp"}>Learn More</CTAButton>
                    <CTAButton active={false} linkto={'/login'}>Book Demo</CTAButton>
            </div>

            <div className=' mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                <video className='shadow-[20px_20px_rgba(255,255,255)]' muted loop autoPlay><source src={banner} type='video/mp4' /></video>
            </div>

                {/*code area design*/}

                <div>
                    <CodeEditor 
                    position={"lg:flex-row"} 
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock Your <HighlightText text={"Coding Journey"}/> with our online cources.
                         </div>   
                    }

                    subHeading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                    ctaBtn1={{
                        text:"Try it yourself",
                        linkto:'/signUp',
                        active:true
                    }}
                    ctaBtn2={{
                        text:"Learn more",
                        linkto:'/login',
                        active:false
                    }}
                    codeBlock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1>This is myPage</h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    codeColor={"text-white"}
                    
                    bgGradient={"bg-[rgba(_255,_255,_255,_0_)] [box-shadow:0_8px_32px_0_rgba(_31,_38,_135,_0.37_)] backdrop-filter backdrop-blur-[2px] rounded-[10px] border-[1px] border-[solid] border-[rgba(255,255,255,0.18)]"}
                    />
                </div>


                <div>
                    <CodeEditor 
                    position={"lg:flex flex-row-reverse"} 
                    heading={
                        <div className='text-4xl font-semibold'>
                            Innovate with Code,  <HighlightText text={"Inspire with Imagination."}/>
                         </div>   
                    }

                    subHeading={"Revolutionize Your Skillset: Embark on a Dynamic Learning Journey with Our Diverse Catalog of Premier Coding Courses."}
                    ctaBtn1={{
                        text:"Continue Lesson",
                        linkto:'/signUp',
                        active:true
                    }}
                    ctaBtn2={{
                        text:"Learn more",
                        linkto:'/login',
                        active:false
                    }}
                    codeBlock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1>This is myPage</h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                    codeColor={"text-white"}
                    
                    bgGradient={"bg-[rgba(_255,_255,_255,_0_)] [box-shadow:0_8px_32px_0_rgba(_31,_38,_135,_0.37_)] backdrop-filter backdrop-blur-[2px] rounded-[10px] border-[1px] border-[solid] border-[rgba(255,255,255,0.18)]"}
                    />
                </div>

                <ExploreMore/>
               
        </div>
        {/*Section 2*/}

                <div className='bg-pure-greys-5 text-richblack-700 mt-4'>
                    <div className='homepage_bg h-[333px]'>
                        <div className='w-11/12 max-w-maxContent flex items-center gap- mx-auto flex-col  justify-between '>
                            <div className='lg:h-[150px]'></div>
                            <div className='flex flex-row gap-7 text-white lg:mt-8'>
                                <CTAButton active={true} linkto={'/signUp'}>
                                    <div className='flex items-center gap-2'>
                                        Explore Full Catalog
                                        <FaArrowRight/>
                                    </div>
                                </CTAButton>

                                <CTAButton active={false} linkto={'/signUp'}>
                                    <div>Learn more</div>
                                </CTAButton>
                            </div>
                        </div>
                    </div>
                    
                    <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8'>
                        <div className='flex flex-row gap-5 mb-10 mt-[95px] '>
                            <div className='text-4xl font-semibold w-[45%]'>
                                Get the Skills you need for a
                                <HighlightText text={"Job that is in demand"}/>    
                            </div>

                            <div className='flex flex-col gap-10 w-[40%] items-start'>
                                <div className='text-[16px]'>
                                The modern AKSD Solution is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                                </div>
                                <CTAButton active={true} linkto={"/signUp"}>
                                    Learn More
                                </CTAButton>
                            </div>
                        </div>
                        <TimelineSection/>
                    <LearningLanguageSection/>  
                    </div>
                </div>
                    
                  
        {/*Section 3*/}

            <div className='relative w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-b bg-richblack-900 text-white'>
                
                <InstructorSection/>

                <h2 className='text-center text-4xl font-semibold mt-8'>Review from Other Students</h2>

            </div>

        {/*Footer*/}
        <Footer/>
    </div>
  )
}

export default Home