const SubSection=require("../models/subSectionModel")
const Section=require("../models/sectionModel");
const { uploadImage } = require("../utils/imageUploader");

exports.createSubSection=async(req,res)=>{
    try {
        const {sectionId,title,timeDuration,description}=req.body
        const video=req.files.videoFile;
        
        if(!sectionId || !title || !timeDuration || !description)
        {
            return res.status(400).json({
                success:false,
                message:"Fields are required"
            })
        }
        const uploadDetails=await uploadImage(video,process.env.FOLDER_NAME)
        const subSectionDetails=await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url

        })
        await Section.findByIdAndUpdate({_id:sectionId},{$push:{subSection:subSectionDetails._id}},{new:true})
        return res.status(200).json({
            success:true,
            message:"SubSection created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating SubSection!"
        })
    }
}


//update Subsection

exports.updateSubSection=async(req,res)=>{
    try {
        const {subSectionId,title,description}=req.body;
        if(!title || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required!"
            })
        }
        const subSection=await SubSection.findById(subSectionId);
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found!"
            })
        }

        subSection.title=title;
        subSection.description=description;

        if(req.files && req.files.video !== undefined){
            const video=req.files.video;
            const uploadDetails=await uploadImage(video,process.env.FOLDER_NAME)

            subSection.videoUrl=uploadDetails.secure_url;
            subSection.timeDuration=`${uploadDetails.duration}`
        }

        return res.status(200).json({
            success:true,
            message:"Subsection updated successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while updating SubSection!"
        })
    }
}


//delete Subsection

exports.deleteSubSection=async(req,res)=>{
    try {
        const {subSectionId,sectionId}=req.body
        
        await Section.findByIdAndUpdate({_id:sectionId},{$pull:{subSection:subSectionId}})
        const subSection=await SubSection.findByIdAndDelete({_id:subSectionId});
        if(!subSection){
            return res.status(404).json({
                success:false,
                message:"Subsection not found!"
            })
        }

        return res.status(200).json({
            success:true,
            message:'Subsection deleted successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while deleting SubSection!"
        })
    }
}