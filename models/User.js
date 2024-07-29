const mongoose=require('mongoose');

const Userschema=new mongoose.Schema({
   name:{
     type:String,
     required:true,
     trim:true,
   },
   email:{
    type:String,
    required:true,
    trim:true,
   },
   password:{
     type:String,
    required:true,
   },
   role:{
    type:String,
    enum:["Admin","Student","visitor"],
   }


});


module.exports=mongoose.model("USers",Userschema);


