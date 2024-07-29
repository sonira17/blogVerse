const Like = require('../models/likeModel');
const Post = require('../models/postModel');

exports.likePost = async (req, res) => {
    try {
        const { postId, user } = req.body;

        // Check if the like already exists
        const existingLike = await Like.findOne({ post: postId, user });

        if (existingLike) {
            return res.status(400).json({ error: "User has already liked this post" });
        }

        // Create a new like
        const like = new Like({ post: postId, user });
        await like.save();

        // Add the like to the post
        const post = await Post.findById(postId);
        post.like.push(like._id);
        await post.save();

        res.json({ message: "Post liked", like });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error while liking post" });
    }
};

exports.unlikePost = async (req, res) => {
    try {
        const { postId, user } = req.body;

        // Find the like
        const like = await Like.findOne({ post: postId, user });

        if (!like) {
            return res.status(404).json({ error: "Like not found" });
        }

        // Remove the like from the post
        const post = await Post.findById(postId);
        post.like.pull(like._id);
        await post.save();

        // Remove the like document
        await Like.deleteOne({ _id: like._id });
        res.json({ message: "Post unliked" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error while unliking post" });
    }
};
