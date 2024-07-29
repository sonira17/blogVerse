

const jwt=require('jsonwebtoken');
//const UserExist=require('../models/User');
require('dotenv').config();

exports.auth=(req,res,next)=>{
   try{
       //extracting jwt token
       console.log('cookies',req.cookies.token);
       console.log('header',req.header("Authorization").replace("Bearer ",""));
       console.log('body',req.body);
       const token=req.header("Authorization").replace("Bearer ","")||req.body.token||req.cookies.token;
       if(!token){
        return res.status(401).json({
            success:false,
            message:"Token not found",
        })
       }
       try{
        const payload=jwt.verify(token,process.env.JWT_SECRATE);
        console.log(payload,"Decoded token");
        req.UserExist=payload;
        
       }catch(error){
        console.log(error);
         return res.status(401).json({
            success:false,
            message:"Decode Not work properly",
         });
       }
       next();
    }catch(error){
       return res.status(401).json({
          success:false,
          message:"Something went wrong while authentication",
       });
   }
};


exports.isStudent=(req,res,next)=>{
    
    try{
        console.log(req.UserExist.role,"Role");
       if(req.UserExist.role!=='Student'){
        return res.status(401).json({
            success:true,
            message:"Only student allowed",
        });
              }
              next();
    }catch(error){
        return res.status(401).json({
            success:true,
            message:"Something went wrong while Student route",
         })
    }
}


exports.isAdmin=(req,res,next)=>{
    
    try{
       if(req.UserExist.role!=='Admin'){
        return res.status(401).json({
            success:true,
            message:"Admin route allowed",
        });
              }
              next();
    }catch(error){
        return res.status(401).json({
            success:true,
            message:"Something went wrong while admin route",
         })
    }
}