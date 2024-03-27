import {toast} from "react-hot-toast"
import { profileEndPoints } from "../Apis"
import { apiConnector } from "../apiConnector"
import { setUser } from "../../slices/profileSlice"
import { logout } from "./authApi"



export function updateDisplayPicture(token,formData){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
  
        try {
            const responce=await apiConnector("POST",profileEndPoints.UPDATE_DISPLAY_PICTURE_API,formData,{"Content-Type":"multipart/form-data",Authorization:`Bearer ${token}`})
            console.log(responce);
            if(!responce.data.success){
                throw new Error(responce.data.message)
            }
            toast.success("Picture Uploaded Successfuly")
            dispatch(setUser(responce.data.data))
            localStorage.setItem("user",JSON.stringify(responce.data.data))
        } catch (error) {
            console.log(error);
            toast.error("Couldn't upload file!")
        }
        toast.dismiss(toastId)
    }
}


export function updateProfile(token,data,navigate){
    return async(dispatch)=>{
        const toastId=toast.loading("Loading...")
        try {
            const responce=await apiConnector("PUT",profileEndPoints.UPDATE_PROFILE_API,data,{Authorization: `Bearer ${token}`})
            console.log(responce);
            if(!responce.data.success){
                throw new Error(responce.data.message)
            }
            dispatch(setUser({...responce.data.user,...responce.data.data}))
            navigate("/dashboard/myProfile")
        } catch (error) {       
            console.log(error);
            toast.error("Couldn't Uploaded")
        }
        toast.dismiss(toastId)
    }
}


export function deleteAccount(token,navigate){
    return async(dispatch)=>{
        try {
            const responce=await apiConnector("DELETE",profileEndPoints.DELETE_ACCOUNT_API,null,{Authorization: `Bearer ${token}`})
            if(!responce.data.success){
                throw new Error(responce.data.message)
            }
            toast.success("Account Deleted")
            dispatch(logout(navigate))
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong!")
        }
    }
}