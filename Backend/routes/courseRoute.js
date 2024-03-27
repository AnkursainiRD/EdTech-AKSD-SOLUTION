const express=require("express")
const router=express.Router();

const {createCourse,showAllCourses,getCourseDetails}=require("../controllers/course")   
const {createSection,updateSection,deleteSection}=require("../controllers/section")
const {createSubSection,updateSubSection,deleteSubSection}=require("../controllers/subSection")
const {createRating,getAvarageRating,getAllRatings}=require("../controllers/ratingAndReviews")
const {createCategory,getAllCategory,categoryPageDetails}=require("../controllers/category")
const {isAdmin,isStudent,isInstructor,auth}=require("../middleware/authMiddleware")

//course routes
router.post("/createCourse",auth,isInstructor,createCourse)
router.post("/getCourseDetails",getCourseDetails)
router.get("/showAllCourses",showAllCourses)

//section routes
router.post("/createSection",auth,isInstructor,createSection)
router.post("/updateSection",auth,isInstructor,updateSection)
router.post("/deleteSection",auth,isInstructor,deleteSection)

//subsection routes
router.post("/createSubSection",auth,isInstructor,createSubSection)
router.post("/updateSubSection",auth,isInstructor,updateSubSection)
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection)

//category routes
router.post("/createCategory",auth,isAdmin,createCategory)
router.post("/categoryPageDetails",categoryPageDetails)
router.get("/getAllCategory",getAllCategory)

//rating and review routes
router.post("/createRating",auth,isStudent,createRating)
router.get("/getAvarageRating",getAvarageRating)
router.get("/getAllRatings",getAllRatings)

module.exports=router;