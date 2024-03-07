const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type: String,
            trim: true
        },
        lastName:{
            type: String,
            trim: true
        },
        username:{
            type: String,
            required: true,
            trim: true
        },
        email:{
            type: String,
            required: true,
            trim: true
        },
        password:{
            type: String,
            required: true
        },
        image:{
            type: String,
        },
        //these two fields are for reset password
        token:{
            type: String
        },
        resetPasswordExpires:{
            type: Date
        }
    },
    { timestamps: true }      // Add timestamps for when the document is created and last modified
);

module.exports = mongoose.model("User", userSchema);