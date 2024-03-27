const Section=require("../models/sectionModel")
const Course=require("../models/courseModel")
const SubSection=require("../models/subSectionModel")

exports.createSection=async(req,res)=>{
    try {
        const {sectionName,courseId}=req.body
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Fields are required"
            })
        }
        const newSection= await Section.create({ sectionName })
        const updatedCourseDetails=await Course.findByIdAndUpdate(courseId,{$push:{courseContent:newSection._id}},{new:true})
        return res.status(200).json({
            success:true,
            message:"Section created successfully.",
            data:updatedCourseDetails
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating section!"
        })
    }
}


exports.updateSection=async(req,res)=>{
    try {
        const {sectionName, sectionId}=req.body;
        const section=await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true})
        return res.status(200).json({
            success:true,
            message:"Section updated successfully",
            data:section
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating section!"
        })
    }
}



exports.deleteSection=async(req,res)=>{
    try {
        const {sectionId,courseId}=req.body;
    
        const section=await Section.findById({_id:sectionId})
        console.log("here -:",section.subSection);
        await Section.findByIdAndDelete({_id:sectionId},{$pull:{subSection:section.subSection._id}},{new:true})
        await Course.findByIdAndUpdate({_id:courseId},{$pull: {courseContent:sectionId}},{new:true})
        return res.status(200).json({
            success:true,
            message:"Section delete successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while deleting section!"
        })
    }
}