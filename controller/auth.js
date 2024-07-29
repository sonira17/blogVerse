const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const user=require('../models/User');
require('dotenv').config();
exports.signup=async (req,res)=>{
    try{
        console.log('naee')
     const {name,email,password,role}=req.body;
     const userExists= await user.findOne({email});
     if(userExists){
        return res.status(400).json({
            success:false,
            message:"User already exists",
        });
     }
     let hashPassword;
     try{
         hashPassword = await bcrypt.hash(password,10);
         
     }
     catch(error){
        return res.status(500).json({
            success:false,
            message:"Password does not hased",
        });
     }
      
   

    const newUser = await user.create({
      name,
      email,
      password: hashPassword,
      role,
  });
     return res.status(200).json({
        success:true,
        message:"User created successfully",
        
     });

    }
    catch(error){
       console.error(error);
       return res.status(500).json({
        success:false,
        message:"User cannot be registered ,Please try later",
       });
    }
}


exports.login=async (req,res)=>{
    try{
      // fectch data from request body
      const{email,password}=req.body;
      const UserExist=await user.findOne({email});
      if(UserExist){
        console.log('Password',password);
        console.log(UserExist.password,"password");
        const hashedPassword=UserExist.password;
        //password verfication
        const payload={
          email :UserExist.email,
          id:UserExist._id,
          role:UserExist.role

        } 
        if(await bcrypt.compare(password,hashedPassword)){
             // creating the jwt token
             const token=jwt.sign(payload,process.env.JWT_SECRATE,{
              expiresIn:"2h",
             });
             UserExist.token=token;
             UserExist.password=undefined;


             const options={
                expiresIn:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
             }
             res.cookie("token",token,options).status(200).json({
              success:true,
              user,
              token,
              message:"User logged in successfully",
             });
        }
        else{
          return res.status(500).json({
            success:false,
            message:"You have entered incorrect Password.",
        })
        }  
      
    }
      else{
        return res.status(500).json({
            success:false,
            message:"User does not exist",
        })
      }

    }
    catch(error){
        console.error(error);
       return res.status(500).json({
        success:false,
        message:"Internal server error",
       });
    }
}