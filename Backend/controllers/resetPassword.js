const User=require("../models/userModel")
const mailSender=require("../utils/mailSender")
const bcrypt=require("bcrypt")
const crypto=require("crypto")

exports.resetPasswordToken=async(req,res)=>{
 try {
       const {email}=req.body;
       const user=await User.findOne({email});
       if(!user){
           return res.status(401).json({
               success:false,
               message:"User doesn't exists"
           })
       }
   
       const token=crypto.randomUUID();
       const updatedUser=await User.findOneAndUpdate({email},{token:token,resetPasswrodExpires:Date.now()+ 5*60*1000},{new:true})
       const url=`http://localhost:5173/update-password/${token}`
   
       await mailSender(email,"Password Reset",`Link :${url}`)
       return res.status(200).json({
           success:true,
           message:"Email Sent Successfully"
       })
 } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Something went wrong while reset password!"
    })
 }
}


exports.resetPassword=async(req,res)=>{
   try {
     const {token,password,confirmPassword}=req.body;
     if(password !== confirmPassword){
        return res.status(400).json({
            success:false,
            success:"Password not matched!"
        })
     }

     const userDetails=await User.findOne({token:token})
     if(!userDetails){
        return res.status(402).json({
            success:false,
            message:"Token is invalid"
        })
     }

     if(userDetails.resetPasswrodExpires< Date.now()){
        return res.status(401).json({
            success:false,
            message:"Token is expired"
        })
     }

     const hashPassword=await bcrypt.hash(password,10);
     await User.findOneAndUpdate({token:token},{password:hashPassword},{new:true})
     return res.status(200).json({
        success:true,
        message:"Password reset successfull"
     })
   } catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Something went wrong"
    })
   }

}