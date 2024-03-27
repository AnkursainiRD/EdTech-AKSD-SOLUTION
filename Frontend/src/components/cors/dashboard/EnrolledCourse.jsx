import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getEnrolledCourses } from '../../../services/operations/profileApi'
import Spinner from '../../common/Spinner'
import ProgressBar from "@ramonak/react-progress-bar"

function EnrolledCourse() {
    const {token}=useSelector((state)=>state.auth)
    const [enrolledCourse,setEnrolledCourse]=useState(null)
    const navigate=useNavigate()

    async function getEnrolledCourseData(){
        try {
            const response=await getEnrolledCourses(token)
            console.log(response);
            setEnrolledCourse(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getEnrolledCourseData()
    },[])
  return (
    <div>
        <div className='text-3xl text-richblack-50'>Enrolled Courses</div>
        {
            enrolledCourse ? (<div><Spinner/></div>):
            (
                !enrolledCourse ?(<p className='grid h-[10vh] w-full place-content-center text-richblack-5'>You have not enrolled in any course yet!</p>)
                :(
                    <div>
                        <div>
                            <p>Course Name</p>
                            <p>Duration</p>
                            <p>Progress</p>
                        </div>

                        {/*course card starts here*/}
                        {
                            enrolledCourse.map((course,index)=>{
                                return(
                                    <div key={index}>
                                        {/*image and title */}
                                        <div>
                                            <img src={course.thumbnail} alt="course thunbnail" />
                                            <div>
                                                <p>{course.courseName}</p>
                                                <p>{course.courseDescreption}</p>
                                            </div>
                                        </div>

                                        {/* duration of course*/}
                                        <div>
                                            {course?.timeDuration}
                                        </div>

                                        {/* progress bar*/}
                                        <div>
                                            <p>Progress: {course.progressPercentage || 0}</p>
                                            <ProgressBar
                                                completed={course.progressPercentage || 0}
                                                height='8px'
                                                isLabelVisible={false}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            )
        }
    </div>
  )
}

export default EnrolledCourse