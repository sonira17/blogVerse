const mongoose=require('mongoose');
//  comment karne wale ka id note hoga uska user and usne kya comment kra h

const commentSchema=new mongoose.Schema({
     post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"post",// reference to the post model
     },
     user:{
        type:String,
        required:true,
     },
     body:{
        type:String,
        required:true,
     }
});
// commentSchema ko comment ke naam se export kra h
// export 
module.exports=mongoose.model("comment",commentSchema);

