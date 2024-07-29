const express=require('express');
const router=express.Router();

const {localFileUpload}=require('../controller/fileUpload');
const {imageUpload,videoUpload,imageUploadCompress}=require('../controller/fileUpload');
router.post("/localFileUpload",localFileUpload);
router.post("/imageUpload",imageUpload);
router.post("/videoUpload",videoUpload);
router.post("/imageUploadCompress",imageUploadCompress);
module.exports=router;


