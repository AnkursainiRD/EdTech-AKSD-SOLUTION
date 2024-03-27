import { createSlice } from "@reduxjs/toolkit";

const initialState={
    courseSecetionData:[],
    courseEntireData:[],
    completedCourse:[],
    totalNoOfLectures:0,
}

const viewCourseSlice=createSlice({
    name:"viewCourse",
    initialState:initialState,
    reducers:{
        setCourseSectionData: (state,action)=>{
            state.courseSecetionData=action.payload
        },
        setEntireCourseData: (state,action)=>{
            state.courseEntireData=action.payload
        },
        setCompletedCourses: (state,action)=>{
            state.completedCourse=action.payload
        },
        setTotalNoOfLectures: (state,action)=>{
            state.totalNoOfLectures=action.payload
        },
        updateCompletedCourses: (state,action)=>{
            state.completedCourse=[...state.completedCourse,action.payload]
        }
    }
})

export const {setCompletedCourses,setCourseSectionData,setTotalNoOfLectures,setEntireCourseData,updateCompletedCourses}=viewCourseSlice.actions
export default viewCourseSlice.reducer