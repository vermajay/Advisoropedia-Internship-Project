const {uploadFileToCloudinary} = require("../utils/fileUploader");
require("dotenv").config();

//controller that uploads profile pic to cloudinary
exports.imageUpload = async(req,res) => {
    try{
        const image = req?.files?.imageFile;
        if(image == null){
            return res.status(400).json(
                {
                    success: false,
                    message: "Image not found",
                    data: "No image found"
                }
            )
        }

        const imgUrl = await uploadFileToCloudinary(image, process.env.FOLDER_NAME, 1000);
        console.log("Inside imageUpload Controller -> ", imgUrl)

        res.send({
            success: true,
            message: `Image Uploaded successfully`,
            data: imgUrl,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
            data: error.message
        })
    }
}