import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndPoints } from "../Apis"



/* Courses Apis */

export async function getAllCourses(){
    const toastId=toast.loading("Loading...")
    let result=[]
    try {
        const response=await apiConnector("GET",courseEndPoints.GET_ALL_COURSE_AP)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result=response?.data?.data
    } catch (error) {
        console.log(error);
        toast.error("Couldn't Fetch Courses")
    }
    toast.dismiss(toastId)
    return result
}


export async function fetchedCourseDetails(courseId){
    const toastId=toast.loading("Loading...")
    let result=null;
    try {
        const response=await apiConnector("GET",courseEndPoints.GET_CATEGORY_PAGE_DETAIL_API,{courseId})
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        console.log(response.data);
        result=response?.data?.data
    } catch (error) {
        console.log(error);
        toast.error("Fetch Error")
    }
    toast.dismiss(toastId)
    return result
}


export async function createCourse(token,data){
    const toastId=toast.loading("Loading...")
    let result=null;
    try {
        const response=await apiConnector("POST",courseEndPoints.CREATE_COURSE_API,data,{"Content-Type": "multipart/form-data",Authorization: `Bearer ${token}`})
        console.log(response);
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Course detils added succesfully")
        result=response?.data?.data
    } catch (error) {
        console.log(error);
        toast.error("Course creating failed!")
    }
    toast.dismiss(toastId)
    return result
}



export async function getCourseCategories(){
    let result=[]
    try {
        const response=await apiConnector("GET",courseEndPoints.GET_ALL_CATEGORY_API)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result=response?.data?.data
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong!")
    }
    return result
}


// TODO :: create edit course api


export async function createSection(token,data){
    let result=null
    const toastId=toast.loading("Loading...")
    try {
        const response=await apiConnector("POST",courseEndPoints.CREATE_SECTION_API,data,{"Content-Type": "multipart/form-data",Authorization: `Bearer ${token}`})
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Section Created")
        result= response.data.data
    } catch (error) {
        console.log(error);
        toast.error("Failed to create section!")
    }
    toast.dismiss(toastId)
    return result;
}


export async function createSubSection(token,data){
    let result=null;
    const toastId=toast.loading("Loading...")
    try {
        const response=await apiConnector("POST",courseEndPoints.CREATE_SUBSECTION_API,data,{ Authorization: `Bearer ${token}`})
        if(!response?.data?.success) {
            throw new Error("Could Not Add Lecture")
        }
        toast.success("Lecture Added")
        result = response?.data?.data
    } catch (error) {
        console.log(error);
        toast.error("Failed to create section!")
    }
    toast.dismiss(toastId)
    return result;
}


export async function updateSection(token,data){
    let result=null;
    const toastId=toast.loading("Loading...")
    try {
        const response=await apiConnector("POST",courseEndPoints.UPDATE_SECTION_API,data,{ Authorization: `Bearer ${token}`})
        if(!response?.data?.success) {
            throw new Error(response.data.message)
        }
        toast.success("Course section updated")
        result = response?.data?.data
    } catch (error) {
        console.log(error);
        toast.error("Failed to update section!")
    }
    toast.dismiss(toastId)
    return result;
}



export async function updateSubSection(token,data){
    let result=null;
    const toastId=toast.loading("Loading...")
    try {
        const response=await apiConnector("POST",courseEndPoints.UPDATE_SUBSECTION_API,data,{ Authorization: `Bearer ${token}`})
        if(!response?.data?.success) {
            throw new Error("Could Not Update Lecture")
        }
        toast.success("Course section updated")
        result = response?.data?.data
    } catch (error) {
        console.log(error);
        toast.error("Failed to update sub-section!")
    }
    toast.dismiss(toastId)
    return result;
}



export async function deleteSection(token,data){
    let result=null;
    const toastId=toast.loading("Loading...")
    try {
        const response=await apiConnector("POST",courseEndPoints.DELETE_SECTION_API,data,{ Authorization: `Bearer ${token}`})
        if(!response?.data?.success) {
            throw new Error(response.data.message)
        }
        toast.success("Course Section Deleted")
        result = response?.data?.data
    } catch (error) {
        console.log(error);
        toast.error("Failed to delete section!")
    }
    toast.dismiss(toastId)
    return result;
}


export async function deleteSubSection(token,data){
    let result=null;
    const toastId=toast.loading("Loading...")
    try {
        const response=await apiConnector("POST",courseEndPoints.DELETE_SUBSECTION_API,data,{ Authorization: `Bearer ${token}`})
        if(!response?.data?.success) {
            throw new Error(response.data.message)
        }
        toast.success("Lecture Updated")
        result = response?.data?.data
    } catch (error) {
        console.log(error);
        toast.error("Failed to delete sub-section!")
    }
    toast.dismiss(toastId)
    return result;
}


// TODO :: get instructor courses function


// TODO :: delete course api


export async function createRating(token,data){
    let result=null;
    const toastId=toast.loading("Loading...")
    try {
        const response=await apiConnector("POST",courseEndPoints.CREATE_RATING_API,data,{ Authorization: `Bearer ${token}`})
        if(!response?.data?.success) {
            throw new Error(response.data.message)
        }
        toast.success("Rating Succesfuly")
        result = response?.data?.data
    } catch (error) {
        console.log(error);
        toast.error("Failed to rate!")
    }
    toast.dismiss(toastId)
    return result;
}
