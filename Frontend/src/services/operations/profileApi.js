import {toast} from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { profileEndPoints } from "../Apis";




export async function getEnrolledCourses(token){
    const toastId=toast.loading("Loading...")
    let result=[]
    try {
        const responce=await apiConnector("GET",profileEndPoints.GET_USER_ENROLLED_COURSES_API,null,{Authorization: `Bearer ${token}`})
        if(!responce.data.success){
            throw new Error(responce.data.message)
        }
        result=responce.data.data
    } catch (error) {
        console.log(error);
        toast.error("Course couldn't fetched")
    }
    toast.dismiss(toastId)
    return result 
}