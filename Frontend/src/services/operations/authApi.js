import { json } from "react-router-dom"
import {setLoading, setToken} from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { endPoints } from "../Apis"
import { apiConnector } from "../apiConnector"
import {toast} from "react-hot-toast"


export function signUp(
  firstName,
  lastName,
  accountType,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try{ 
          const response = await apiConnector("POST", endPoints.SIGNUP_API, {
            firstName,
            lastName,
            accountType,
            email,
            password,
            confirmPassword,
            otp
          })

          console.log("SIGNUP API RESPONSE...........", response)
          
          if(!response.data.success) {
              throw new Error(response.data.message)
          }
          toast.success("Signup Successful")
          navigate("/login")

      } catch(error) {
          console.log("SIGNUP API ERROR.............", error)
          toast.error("Signup Failed")
          navigate("/signup")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
  }
}



export function login(email,password,navigate){
  return async(dispatch)=>{
    dispatch(setLoading(true))
    try {
      const responce=await apiConnector("POST",endPoints.LOGIN_API,{email,password})
      if(!responce.data.success){
         throw new Error(responce.data.message)
      }
      toast.success("Login Successful")
      
      dispatch(setToken(responce.data.token))
      console.log(responce);
      const displayImage=responce?.data?.user?.image ?(responce.data.user.image):( `https://api.dicebear.com/5.x/initials/svg?seed=${responce.data.user.firstName} ${responce.data.user.lastName}`)
     
      dispatch(setUser({...responce.data.user,image:displayImage}))

      localStorage.setItem("token",JSON.stringify(responce.data.token))
      localStorage.setItem("user",JSON.stringify(responce.data.user))
      navigate("/dashboard/myProfile")

    } catch (error) {
      console.log(error);
      toast.dismiss("Login Failed")
      navigate("/login")
    }
    dispatch(setLoading(false))
  }
}



export function logout(navigate){
  return async(dispatch)=>{
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logout Successfuly")
    navigate("/login")
  }
}




export function sendOtp(email,navigate){
  return async(dispatch)=>{
    const toastId=toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const res=await apiConnector("POST",endPoints.SENDOTP_API,{email,checkuserPresent: true,})
      if(!res.data.success){
        throw new Error(res.data.message)
      }
      toast.success("Otp Sent")
      navigate("/verifyEmail")
    } catch (error) {
      console.log(error);
      toast.dismiss(toastId)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function getPasswordResetToken(email,setEmailSent){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try {
            const responce=await apiConnector("POST",endPoints.RESETPASSTOKEN_API,{email})
            if(!responce.data.success){
                throw new Error(responce.data.message)
            }
            toast.success("Reset Email Sent")
            setEmailSent(true)
        } catch (error) {
            console.log(error);
        }

       dispatch(setLoading(false)) 
    }
}




export function resetPassword(password, confirmPassword, token) {
    return async(dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await apiConnector("POST", endPoints.RESETPASSWORD_API, { password, confirmPassword, token });
  
        console.log("RESET Password RESPONSE ... ", response);
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Password Has Been Reset Successfully");
      }
      catch(error) {
        console.log("RESET PASSWORD TOKEN Error............", error);
        toast.error("Unable To Reset Password");
      }
      dispatch(setLoading(false));
    }
  }


export function updatePassword(token,data){
  return async(dispatch)=>{
     const toastId=toast.loading("Loading...")
     try {
       const responce=await apiConnector("POST",endPoints.CHANGE_PASSWORD_API,data,{Authorization: `Bearer ${token}`})
        if(!responce.data.success){
          throw new Error(responce.data.message)
        }
        toast.success("Password Updated")
     } catch (error) {
        console.log(error);
        toast.error("Couldn't Update Password")
     }
     toast.dismiss(toastId)
  }
}
