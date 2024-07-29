const Post = require('../models/postModel');

exports.updatePost = async (req, res) => {
    try {
       
       // const { id } = req.params;  // Use req.params to get the id from URL parameters
        const { _id,title, body } = req.body;

        // Find the post by its ID
        const post = await Post.findById(_id);

        // If the post does not exist, return an error
        if (!post) {
            return res.status(404).json({
                error: "Post not found",
            });
        }

        // Update the post's fields with the new data
        post.title = title || post.title;
        post.body = body || post.body;

        // Save the updated post
        const updatedPost = await post.save();

        // Send the response with the updated post
        res.json({
            post: updatedPost,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error while updating post",
        });
    }
};
