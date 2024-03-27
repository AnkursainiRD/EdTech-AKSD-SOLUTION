const express=require("express")
const router=express.Router();

const {capturePayment,verifySignature}=require("../controllers/payment");
const { auth, isAdmin } = require("../middleware/authMiddleware");

router.post("/capturePayment",auth,isAdmin,capturePayment)
router.post("/verifySignature",verifySignature)

module.exports=router;  