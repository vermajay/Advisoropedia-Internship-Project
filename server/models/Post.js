const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true,
            trim: true
        },
        description:{
            type: String,
            required: true,
            trim: true
        },
        category:{
            type: String,
            required: true,
            trim: true
        },
        content_text:{
            type: String,
            required: true,
            trim: true
        },
        photo_url:{
            type: String,
            required: true
        },
        id:{
            type: Number,
            required: true
        },
        created_at:{
            type: String,
            required: true
        },
        updated_at:{
            type: String,
            required: true
        },
    },
);

module.exports = mongoose.model("Post", postSchema);