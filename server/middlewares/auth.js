const jwt = require("jsonwebtoken");
require("dotenv").env;

//auth middleware for verifying jwt tokens
exports.auth = async(req, res, next) => {
    try{
        //extract token
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ", "");

        //if no token found, return response
        if(!token){
            return res.status(401).json(
                {
                    success: false,
                    message: "No token found"
                }
            )
        }

        //validate the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token-> ", decode);
            next();
        }
        catch(error){
            return res.status(401).json(
                {
                    success: false,
                    message: "Token is invalid"
                }
            )
        }
    }
    catch(error){
        console.log("Error in verifying token-> ", error);
        res.status(500).json(
            {
                success: false,
                message: "Error in verifying token"
            }
        )
    }
}