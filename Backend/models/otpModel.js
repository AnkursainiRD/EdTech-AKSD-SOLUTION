const mongoose=require("mongoose");
const mailsender = require("../utils/mailSender");
const e = require("express");
const otpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expire:5*60
    }
})

async function sendVerificationMail(email,otp){
    try {
        const mailResponce=await mailsender(email,"Verification Email from Aksd Solution", otp);
    } catch (error) {
        console.log("Error occur while sending mail");
        throw error
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationMail(this.email,this.otp);
    console.log(this.otp);
    next();
})

module.exports=mongoose.model("OTP",otpSchema)