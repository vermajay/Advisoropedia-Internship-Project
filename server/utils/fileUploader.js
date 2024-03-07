const cloudinary = require("cloudinary").v2;

//this function uploads files to the cloudinary

exports.uploadFileToCloudinary = async(file, folder, height, quality) => {
    const options = {
        folder,
        resource_type: "auto"
    }
    if(height) options.height = height;
    if(quality) options.quality = quality;

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}