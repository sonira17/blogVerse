const Comment=require('../models/commentModel');
const Post=require('../models/postModel');
// kis post pr comment kra h =post
// kya comment kra h=body
// kisne comment kra h=user


exports.createComment=async (req,res)=>{
    try{
        // fetch data from request body
        const {post,user,body}=req.body;
        // create comment object
        const comment=new Comment({post,user,body});
        // save new comment into the database
        const savedComment=await comment.save();
        // find the post by ID , add new comment to its comment array
        const updatePost=await Post.findByIdAndUpdate(post,{$push:{comments:savedComment._id}},{new:true})
        .populate("comments")// populate the commet array with comment documents
        .exec();
        res.json({
            post:updatePost,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            error:"Error while creating comment",
            
        });
    }
};