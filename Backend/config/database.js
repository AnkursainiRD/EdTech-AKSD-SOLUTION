const mongoose=require("mongoose");
require("dotenv").config();

exports.dbConnect=()=>{
    mongoose.connect(process.env.URL)
    .then(()=>{
        console.log("Database Connected Successfully");
    })
    .catch((error)=>{
        console.log("Database Connection Error");
        console.log(error);
        process.exit(1);
    })
}