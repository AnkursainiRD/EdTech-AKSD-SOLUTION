const Profile=require("../models/profileModel")
const User=require("../models/userModel");
const { uploadImage } = require("../utils/imageUploader");

exports.updateProfile=async(req,res)=>{
    try {
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;
        const id=req.user.id; 
        if(!contactNumber || !gender){
            return res.status(400).json({
                success:false,
                message:"All fields are required!"
            })
        }
        const userDetails=await User.findById(id)
        const profileId=userDetails.additionalDetails;
        const profileDetails=await Profile.findByIdAndUpdate(profileId)

        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.gender=gender;
        profileDetails.about=about;
        profileDetails.contactNumber=contactNumber;

        await profileDetails.save();
        return res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            data:profileDetails,
            user:userDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating profile!"
        })
    }
}


exports.deleteAccount=async(req,res)=>{
    try {
        const userId=req.user.id
        const userDetails=await User.findById(userId)
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found!"
            })
        }

        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})
        await User.findByIdAndDelete({_id:userId})

        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while deleting profile!"
        })
    }
}



exports.getUserDetails=async(req,res)=>{
    try {
        const id=req.user.id;
        const userDetails=await User.findById(id).populate("additionalDetails").exec()
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:"User not found!"
            })
        }
        return res.status(200).json({
            success:true,
            message:"User feteched successfully",
            data:userDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.updateDisplayPicture=async(req,res)=>{
    try {
        const dp=req.files.displayPicture;
        const userId=req.user.id;
        const image=await uploadImage(dp,process.env.FOLDER_NAME,1000,1000)

        const updateProfile=await User.findByIdAndUpdate({_id:userId},{image:image.secure_url},{new:true})
        return res.status(200).json({
            success:true,
            message:"Profile picture updated successfully",
            data:updateProfile
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.getEnrolledCourses=async(req,res)=>{
    try {
        const userId=req.user.id;
        const user=await User.findOne({_id:userId}).populate("courses").exec()
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User doesn't exist!"
            })
        }    
        return res.status(200).json({
            success:true,
            message:"Course fetched successfuly",
            data:user.courses
        })    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}   