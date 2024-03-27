const jwt=require("jsonwebtoken")
const User=require("../models/userModel")
require("dotenv").config()

// auth
exports.auth=async(req,res,next)=>{
    try {
        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","")
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token not found"
            })
        }

        try {
            const decode= jwt.verify(token,process.env.JWT_SECRET);
            req.user=decode;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:"invalid token"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went wrong while validating the token!"
        })
    }
}

//Is Student

exports.isStudent=async(req,res,next)=>{
    try {
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"Protected route for student only."
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified."
        })
    }
}


// Is Instructor

exports.isInstructor=async(req,res,next)=>{
    try {
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"Protected route for Instructor only."
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified."
        })
    }
}

// Admin

exports.isAdmin=async(req,res,next)=>{
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"Protected route for Admin only."
            })
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified."
        })
    }
}