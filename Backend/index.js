const express=require("express")
const app=express();
require("dotenv").config()

// //All routes imported
const userRoute=require("./routes/userRoute")
const courseRoute=require("./routes/courseRoute")
const paymentRoute=require("./routes/paymentRoute")
const profileRoute=require("./routes/profileRoute")


const {dbConnect}=require("./config/database")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const {cloudinaryConnect}=require("./config/cloudinary")
const fileUpload=require("express-fileupload")

const PORT=process.env.PORT || 4000;
 dbConnect()

 
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

cloudinaryConnect()

app.use("/api/v1/auth",userRoute)
app.use("/api/v1/payment",paymentRoute)
app.use("/api/v1/profile",profileRoute)
app.use("/api/v1/course",courseRoute)

app.get("/",function(req,res){
    return res.json({
        success:true,
        message:"Server working properly...."
    })
})

app.listen(PORT,()=>{
    console.log("Server started successfully....At port",PORT);
})