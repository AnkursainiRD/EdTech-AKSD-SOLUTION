const RatingAndReviews=require("../models/ratingAndReviewsModel")
const Course=require("../models/courseModel");
const { default: mongoose } = require("mongoose");

//Create rating

exports.createRating=async(req,res)=>{
    try {
        const userId=req.user.id;
        const {rating,review,courseId}=req.body;
        
        const courseDetails=await Course.findOne({_id:courseId, studentsEnrolled:{$elemMatch: {$eq: userId}}});
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"User is not enrolled in the course!"
            })
        }

        const alreadyReviewed=await RatingAndReviews.findOne({user:userId,course:courseId})
        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"User already reviewed this course!"
            })
        }

        const ratingReview=await RatingAndReviews.create({
            rating,
            review,
            course:courseId,
            user:userId
        })

        await Course.findByIdAndUpdate({_id:courseId},{$push:{ratingAndReviews:ratingReview.id}},{new:true})
        return res.status(200).json({
            success:false,
            message:"Review added successfylly"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//get avarage rating

exports.getAvarageRating=async(req,res)=>{
    try {
        const courseId=req.body.courseId;

        const result=await RatingAndReviews.aggregate(
            [
                {
                    $match:{
                        course:new mongoose.Schema.Types.ObjectId(courseId)
                    }
                },
                {
                    $group:{
                        _id:null,
                        avarageRating:{$avg:"$rating"}
                    }
                }
            ])

            if(result.length>0){
                return res.status(200).json({
                    success:true,
                    avarageRating:result[0].avarageRating
                })
            }
            return res.status(200).json({
                success:true,
                message:"No ratings till now!"
            })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



//get all rating

exports.getAllRatings=async(req,res)=>{
    try {
        const allRating=await RatingAndReviews.find({})
                                .sort({rating:"desc"})
                                .populate({
                                    path:"user",
                                    select:"firstName lastName email image"
                                })
                                .populate({
                                    path:"course",
                                    select:"courseName"
                                })
                                .exec()

     return res.status(200).json({
        success:true,
        message:"Reviews fetched successfully",
        data:allRating
     })
                                
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}