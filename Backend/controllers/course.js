const Course=require("../models/courseModel")
const Category=require("../models/categoryModel")
const User=require("../models/userModel")
const {uploadImage}=require("../utils/imageUploader")

exports.createCourse=async(req,res)=>{
    try {
        
        const {courseName,courseDescription,whatYouWillLearn,price,category}=req.body;
        const thumbnail=req.files.thumbnailImage;

        if(!courseDescription || !courseName || !whatYouWillLearn || !price || !category){
            return res.status(400).json({
                success:false,
                message:"All fields are rquired!"
            })
        }
        
        const userId=req.user.id;
        const instructorDetails=await User.findById(userId)

        if(!instructorDetails){
            return res.status(404).json({
                success:false,
                message:"Instructor details not found"
            })
        }
        
        const categoryDetails=await Category.findById(category)
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:"Category not found"
            })
        }
        
        const thumbnailImage=await uploadImage(thumbnail,process.env.FOLDER_NAME)

        const newCourse=await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            category:categoryDetails._id,
            thumbnail:thumbnailImage.secure_url
        })

        await User.findByIdAndUpdate({_id: instructorDetails._id},{$push: { courses:newCourse._id}},{new:true})
        await Category.findByIdAndUpdate({_id:categoryDetails._id},{course:newCourse._id},{new:true})

        return res.status(200).json({
            success:true,
            message:"Course Created Scuccessfully",
            data:newCourse
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to create course, Try again!",
            error:error.message
        })
    }
}


exports.showAllCourses=async(req,res)=>{
    try {
            const allCourses=await Course.find({},{
                    courseName:true,
                    courseDescription:true,
                    price:true,
                    thumbnail:true,
                    instructor:true,
                    ratingAndReviews:true,
                    studentsEnrolled:true
            }).populate("instructor").exec()
            return res.status(200).json({
                success:true,
                message:"Fetched all courses",
                data:allCourses
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to fetched courses, Try again!",
            error:error.message
        })
    }
}


exports.getCourseDetails=async(req,res)=>{
    try {
        console.log("here");
        const {courseId}=req.body;
        const getCourseDetails=await Course.find({_id:courseId})
                                            .populate({
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails"
                                                }
                                            })
                                            .populate("category")
                                            .populate("ratingAndReviews")
                                            .populate({
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSection"
                                                }
                                            })
                                            .exec();

       if(!getCourseDetails){
        return res.status(400).json({
            success:false,
            message:`Could not find the course with ${courseId}`
        })
       }  
       
       return res.status(200).json({
        success:true,
        message:"Data fetched successfully",
        data:getCourseDetails
       })
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to fetched courses, Try again!",
            error:error.message
        })  
    }
}