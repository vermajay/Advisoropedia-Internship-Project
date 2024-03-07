const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = () => {                     //function to connect to mongodb database
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log(`Connection with database successful`))
    .catch((error)=>{
        console.error(error);
        console.log("Issue in connecting to database");
        process.exit(1);
    })
};