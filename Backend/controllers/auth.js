const User=require("../models/userModel")
const OTP=require("../models/otpModel")
const otpGenerator=require("otp-generator")
const bcrypt=require("bcrypt")
const Profile=require("../models/profileModel")
const jwt=require("jsonwebtoken")
const mailsender = require("../utils/mailSender")
require("dotenv").config()

//Send OTP

exports.sendOTP=async (req,res)=>{
   try {
     const {email}=req.body;
     const checkUser=await User.findOne({email})
     if(checkUser){
         return res.status(401).json({
             success:false,
             message:"User Already Exists"
         });
     }

     var otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
     });

     let result=await OTP.findOne({otp:otp})
     while(result){
        otp=otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
         });
         result=await OTP.findOne({otp:otp})
     }

     const otpPayload={email,otp};
     const otpBody= await OTP.create(otpPayload)
     res.status(200).json({
        success:true,
        message:"Otp Sent Successfully",
        otp
     })

   } catch (error) {
        console.log(error),
        re.status(500).json({
        success:false,
        message:error.message
        })
   }   
}


// Sign Up

exports.signUp=async (req,res)=>{

    try {
        const {
            firstName,
            lastName,
            accountType,
            email,
            password,
            confirmPassword,
            contactNumber,
            otp}=req.body

    
            if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
          
                return res.status(403).json({
                    success:false,
                    message:"All fields are required"
                })
            }
            
            console.log(password,confirmPassword);
            if(password!== confirmPassword){
                console.log(typeof password, typeof confirmPassword ,password,confirmPassword);
                return res.status(400).json({
                    success:false,
                    message:"Password does not matched"
                })
            }
            const existUser=await User.findOne({email});
            if(existUser){
                return res.status(400).json({
                    success:false,
                    message:"User already exists"
                })
            }
    
            const recentOtp=await OTP.findOne({email}).sort([['_id', -1]]);
            if(recentOtp.length== 0){
                return res.status(400).json({
                    success:false,
                    message:"Otp Not Found"
                })
            }else if(otp !== recentOtp.otp){
                return res.status(400).json({
                    success:false,
                    message:"Invalid OTP"
                })
            }
    
            const profileDetails=await Profile.create({
                gender:null,
                dateOfBirth:null,
                about:null,
                contactNumber:null
            })
    
            const hashPassword=await bcrypt.hash(password,10);
            const user=await User.create({
                firstName,
                lastName,
                email,
                contactNumber,
                password:hashPassword,
                accountType,
                additionalDetails:profileDetails._id,
                image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
            })
            return res.status(200).json({
                success:true,
                message:"User Registered Successfully",
                user
            })
            
    } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:"User regestration failed, Try again!"
            })
    }
}


// Login

exports.login=async (req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All Field Are Required"
            })
        }
        const user=await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User Doesn't Exist"
            })
        }

        if(await bcrypt.compare(password, user.password)){

            const payload={
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }

            const token=jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"2h",
            })
            user.token=token;
            user.password=undefined;
            
            const options={
                expires: new Date(Date.now()+ 3*24*60*60*100),
                httpOnly:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Invalid Password"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Login Failure, Try Again!"
        })
    }
}



// change Password

exports.changePassword=async(req,res)=>{
    try {
        const userId=req.user.id;
        const {oldPassword,newPassowrd}=req.body;
        const userDetails=await User.findById({_id:userId})
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found!"
            })
        }

        if(await bcrypt.compare(oldPassword,userDetails.password)){
            const hashPassword=await bcrypt.hash(newPassowrd,10);
            const updateUser=await User.findByIdAndUpdate({_id:userId},{password:hashPassword},{new:true})
            try {
                const emailResponce=await mailsender(updateUser.email,`Password update successfully for ${updateUser.firstName} ${updateUser.lastName}`,"Password Updated")
                return res.status(200).json({
                    success:true,
                    message:"Password change successfully."
                })
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Error Occurred While Sending Email',
                    error: error.message,
                });
            }
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Invalid Password!"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error while updating password!',
            error: error.message,
        });
    }
}

