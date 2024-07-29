const express=require('express');
const router=express.Router();

const {auth,isStudent,isAdmin}=require('../middleware/auth');

const {login,signup}=require('../controller/auth');

router.post("/login",login);
router.post("/signup",signup);
 
router.get('/test',auth,(req,res)=>{
    res.json({
        success:true,
        message:"Test middleware checked succesfully",
    });
});


router.get('/student',auth,isStudent,(req,res)=>{
    res.json({
        success:true,
        message:"Student middleware checked succesfully",
    });
});

router.get('/Admin',auth,isAdmin,(req,res)=>{
    res.json({
        success:true,
    message:"Admin middleware run successfully",
    })
})

module.exports=router;