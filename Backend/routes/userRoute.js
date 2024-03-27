const express=require("express")
const router=express.Router();

const {login,signUp,sendOTP,changePassword}=require("../controllers/auth");
const { auth } = require("../middleware/authMiddleware");
const { resetPasswordToken, resetPassword } = require("../controllers/resetPassword");

router.post("/login",login)
router.post("/signUp",signUp)
router.post("/sendOTP",sendOTP)
router.post("/changePassword",auth,changePassword)

//reset password
router.post("/resetPasswordToken",resetPasswordToken)
router.post("/reset-password",resetPassword)

module.exports=router;