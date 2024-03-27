const Category=require("../models/categoryModel")

exports.createCategory=async(req,res)=>{
    try {
        const {name,description}=req.body;
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required!"
            })
        }

        const categoryDetails=await Category.create({categoryName:name, description:description});
        return res.status(200).json({
            success:true,
            message:"Category created successfully"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating Category!"
        })
    }
}


exports.getAllCategory=async(req,res)=>{
    try {
        const allCategory=await Category.find({},{categoryName:true,description:true})
        return res.status(200).json({
            success:true,
            message:"ALl Category get successfully",
            data:allCategory
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating Category!"
        }) 
    }
}


//category page details

exports.categoryPageDetails=async(req,res)=>{
    try {
        const {categoryId}=req.body;

        const selectedCategory=await Category.findById(categoryId)
                                                .populate("course")
                                                .exec()

        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"Data not found"
            })
        }
        
        const differentCategories=await Category.find({_id:{$ne:categoryId}})
                                                   .populate("course")
                                                   .exec()

        //const topSellingCourse       
        
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating tags!"
        }) 
    }
}