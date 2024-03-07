const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resetPasswordToken - link generation and mail send
exports.resetPasswordToken = async(req, res) => {
    try{
        //get email from req body
        const email = req.body.email;

        //check if email exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json(
                {
                    success: false,
                    message: "User doesn't exists"
                }
            )
        }

        //generate token
        const token = crypto.randomBytes(20).toString("hex");

        //update user by adding token and expiration time
        const updateDetails = await User.findOneAndUpdate(
            {email:email}, {token:token, resetPasswordExpires:Date.now() + 5*60*1000}, {new:true}
        );
        console.log("updated user with token and expiration-> ", updateDetails);

        //create url for resetting password
        const url = `http://localhost:3000/update-password/${token}`;   //this is a link to the UI of app (frontend)
 
        //send the mail with the reset password link to the user
        await mailSender(email, "Password Reset Link", `Password Reset Link: ${url} \n This link is valid for 5 minutes`);

        res.status(200).json(
            {
                success: true,
                message: "Password reset link sent succesfully to user mail",
                updateDetails
            }
        )

    }
    catch(error){
        console.log("Error in generating reset link or sending mail-> ",error.message);
        res.status(500).json(
            {
                success: false,
                messgae: "Error in generating reset link or sending mail"
            }
        )
    }
}

//resetPassword - updates password in db
exports.resetPassword = async (req,res) => {
    try{
        const {token, password, confirmPassword} = req.body;

        //validate the data
        if(!password || !confirmPassword){
            return res.status(403).json(
                {
                    success: false,
                    message: "All fields are required"
                }
            )
        }

        //fetch user details from database using token sent in reset email
        let user = await User.findOne({token:token}); 
        if(!user){
            return res.status(400).json(
                {
                    success: false,
                    message: "Token is invalid, please regenerate your token"
                }
            )
        }

        //check if token is expired
        if(Date.now() > user.resetPasswordExpires){
            return res.status(400).json(
                {
                    success: false,
                    message: "Token is expired, please regenerate your token"
                }
            )
        }

        //match the 2 new passwords
        if(password !== confirmPassword){
            return res.status(400).json(
                {
                    success: false,
                    message: "password and confirmPassword do not match"
                }
            )
        }

        //HASH the password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(error){
            return res.status(500).json(
                {
                    success: false,
                    message: "Error in hashing password"
                }
            )
        }

        //update password in database
        user = await User.findOneAndUpdate({token:token}, {password:hashedPassword}, {new:true});
        console.log("Updated user-> ", user);

        //send the mail that the password is resetted
        await mailSender(user.email, "Password Resetted Successfully", "Your password is successfully resetted");

        //return successfull response
        res.status(200).json(
            {
                success: true,
                message: "Password resetted successfully"
            }
        )
    }
    catch(error){
        console.log("Error in resetting password-> ", error);
        res.status(500).json(
            {
                success: false,
                message: "Error in resetting password"
            }
        )
    }
}