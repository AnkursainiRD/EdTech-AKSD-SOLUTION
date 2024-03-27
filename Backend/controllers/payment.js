const {instance}=require('../config/razorpay')
const Course=require("../models/courseModel")
const User=require("../models/userModel")
const mailSender=require("../utils/mailSender")
const {courseEnrollmentEmail}=require("../mail/template/courseEnrollmentEmail")
const { default: mongoose } = require('mongoose')

exports.capturePayment=async(req,res)=>{
        const {course_id}=req.body;
        const userId=req.user.id;
        
        if(!course_id){
            return res.status(400).json({
                success:false,
                message:"Course id missing!"
            })
        }
        let course;
        try {
            course=await Course.findById(course_id);
            if(!course){
                return res.status(400).json({
                    success:false,
                    message:"Course doesn't exists!"
                })
            }

            const uid=new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(200).json({
                    success:false,
                    message:"Student is already enrolled!"
                })
            }
        } catch (error) {
            console.log(error);
             res.status(500).json({
                success:false,
                message:error.message
            })
        }

        //Order Create  

        const amount=course.price;
        const currency="INR";
        
        const options={
            amount:amount*100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes:{
                courseId:course_id,
                userId,
            }
        }

        try {
            const paymentResponse=await instance.orders.create(options)
            console.log(paymentResponse);

            return res.status(200).json({
                success:true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount
            })
        } catch (error) {
            console.log(error);
            res.json({
                success:false,
                message:"Initiate order get failed!"
            })
        }
    } 


    

    // Verify Signature

    exports.verifySignature=async(req,res)=>{
        const webHook="0213";
        const signature=req.headers("x-razorpay-signature");
        //hashing webhook seceret
        const shaum=crypto.createHmac("sha256",webHook);
        shaum.update(JSON.stringify(req.body));
        const digest=shaum.digest("hex");

        if(signature === digest){
            console.log("Payment is authorized");

            const {courseId,userId}=req.body.payload.entity.notes;
            try {
                const enrolledCourse=await Course.findOneAndUpdate({_id:courseId},{$push:{studentsEnrolled:userId}},{new:true})
                if(!enrolledCourse){
                    return res.status(500).json({
                        success:false,
                        message:"Course not found"
                    })
                }
               const enrolledStudennt= await User.findOneAndUpdate({_id:userId},{$push:{courses:courseId}},{new:true})

               const emailResponce=await mailSender(enrolledStudennt.email,"Congratulation","Successfully enrolled in course.")
               return res.status(200).json({
                success:true,
                message:"Course Added."
               })
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    success:false,
                    message:error.message
                })
            }
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Invalid request."
            })
        }
    }

