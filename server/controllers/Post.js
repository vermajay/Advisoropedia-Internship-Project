const Post = require("../models/Post")

//function to fetch all posts in a paginated way
exports.getPosts = async(req,res) => {

    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < await Post.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }

    try{
        results.results = await Post.find({}).sort({id:1}).limit(limit).skip(startIndex).exec();

        res.status(200).json(
            {
                success: true,
                message: "Paginated posts fetched successfully",
                results
            }
        )
    }
    catch(error){
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        )
    }
}