const express = require('express');
const router = express.Router();

const {deleteAccount,updateProfile,getUserDetails,updateDisplayPicture, getEnrolledCourses}=require("../controllers/profile");
const { auth } = require("../middleware/authMiddleware.js");

router.delete("/deleteAccount",auth,deleteAccount)
router.put("/updateProfile",auth,updateProfile)
router.get("/getUserDetails",auth,getUserDetails)
router.get("/getEnrolledCourses",auth,getEnrolledCourses)
router.post("/updateDisplayPicture",auth,updateDisplayPicture)


module.exports=router;