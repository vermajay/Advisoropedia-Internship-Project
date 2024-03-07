const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true
        },
        otp:{
            type: String,
            required: true
        },
        createdAt:{
            type: Date,
            default: Date.now(),
            expires: 5*60  //5minutes
        }
    }
);

async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification email from Advisoropedia", emailTemplate(otp));
        console.log("Email sent successfully", mailResponse);
    }
    catch(error){
        console.log("Error while sending mail -> ", error);
        throw error;
    }
}

OTPSchema.pre("save", async function (next){
    // Only send an email when a new document is created
    if(this.isNew){
        console.log("Sending mail");
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP", OTPSchema);