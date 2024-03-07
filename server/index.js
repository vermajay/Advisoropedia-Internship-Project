const express = require("express");
const app = express();

const {dbConnect} = require("./config/database");
const {cloudinaryConnect} = require("./config/cloudinary");

const cookieParser = require("cookie-parser");
const cors = require("cors");

const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 4000;  //get the port from the environment variables
dotenv.config();

//database connect
dbConnect();

//cloudinary connect
cloudinaryConnect();

//add middlewares
app.use(express.json());

app.use(cookieParser());

app.use(fileUpload(
    {
        useTempFiles: true,
        tempFileDir: "/tmp/"
    }
))

app.use(cors(
    {
        origin: "*",
        credentials: true
    }
))

//default route
app.get("/", (req,res)=>{
    return res.status(200).json(
        {
            success: true,
            message: "Your server is up and running...."
        }
    )
})

//import controllers
const { imageUpload } = require("./controllers/imageUpload"); 
const { sendOTP, signUp, login } = require("./controllers/Auth");
const { resetPasswordToken, resetPassword } = require("./controllers/ResetPassword");
const { getPosts } = require("./controllers/Post");
const { auth } = require("./middlewares/auth")

//more routes
app.put("/api/v1/upload", imageUpload);
app.post("/api/v1/sendotp", sendOTP);
app.post("/api/v1/signup", signUp)
app.post("/api/v1/login", login)
app.post("/api/v1/reset-password-token", resetPasswordToken)
app.post("/api/v1/reset-password", resetPassword)
app.get("/api/v1/get-posts", auth, getPosts);   //middleware for authentication

//make the app live on port
app.listen(PORT, ()=>{
    console.log(`App is running at port ${PORT}`);
})