const Post=require('../models/postModel');

exports.createPost=async (req,res)=>{
    try{
     const {title,body}=req.body;
     const post=new Post({title,body});
     const createdPost=await post.save();
     res.json({
        post:createdPost,
        message:"Post created successfully",
     })

    }
    catch(error){
        console.log(error);
        res.status(500).json({
            error:"Error while creating post", 
        })
    }
}