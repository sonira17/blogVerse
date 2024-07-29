const File=require('../models/file');
const cloudinary=require('cloudinary').v2;
exports.localFileUpload=async (req,res)=>{
  try{
    // fetch file
    const file=req.files.file;
    console.log(file,"Meri file h y");
    // path pr file ko daalna h

    let path=__dirname+'/files/'+Date.now()+`.${file.name.split('.')[1]}`;
   console.log(path,"-path");
    file.mv(path,(error)=>{
        console.log(error,'Error occured');
    });

    res.json({
        success:true,
        message:'Local file uploaded successfully',
    });
  }
  catch(error){
   console.log(error);
  }
}

function isFileSupported(type,supportedType){
    return supportedType.includes(type);
}

async function fileUploadToCloudinary(file,folder,resourceType = 'auto',transformation={}){
     const options={folder, resource_type: resourceType ,
      ...transformation
     };
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}



exports.imageUpload=async(req,res)=>{
  try{
    // fetch data

    const {name,tags,email}=req.body;
    console.log(name,tags,email);

    const file=req.files.imageFile;
   console.log("File",file);
    //validation
    const supportedFormate=["jpg","jpeg","png"];
    const fileType=file.name.split(".")[1].toLowerCase();
    if(!isFileSupported(fileType,supportedFormate)){
      req.status(200).json({
        success:false,
        message:"File format not supported",
      });
       }
   const response=await fileUploadToCloudinary(file,"soni",'image',
    {
      quality: "auto", // Automatically adjusts the quality
      fetch_format: "auto" // Automatically selects the best format
    }
   );
   console.log(response);
  // db k  andar entry save
  const fileData=await File.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url,
  })
  res.json({
    success:true,
    message:"Image uploaded successfully",
  });
  }catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"Something went wrong",
    })
  }
}


exports.videoUpload=async (req,res)=>{
   try{
       // fetch data from request body
    const {name,email,tags}=req.body;
    console.log(name,email,tags);

    const video=req.files.videoFile;
    console.log(video,"video");

    //validation
    const supportedVideoformate=["mp4","avi"];
    const fileType=video.name.split(".")[1].toLowerCase();

    if(!isFileSupported(fileType,supportedVideoformate)){
          return res.status(200).json({
            success:false,
            message:"File format not supported",
          });
    }

    // agar valid h to upload kr do
    const response=await fileUploadToCloudinary(video,"soni",'video');
    console.log(response);
   // db k  andar entry save
  //  const fileData=await File.create({
  //    name,
  //    tags,
  //    email,
  //    videoUrl:response.secure_url,
  //  })
   res.json({
     success:true,
     message:"Image uploaded successfully",
     videoUrl:response.secure_url,
   });

   }catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"Something went wrong",
    });

   }
}

exports.imageUploadCompress=async(req,res)=>{
  try{
    // fetch data

    const {name,tags,email}=req.body;
    console.log(name,tags,email);

    const file=req.files.imageFile;
   console.log("File",file);
    //validation
    const supportedFormate=["jpg","jpeg","png"];
    const fileType=file.name.split(".")[1].toLowerCase();
    if(!isFileSupported(fileType,supportedFormate)){
      req.status(200).json({
        success:false,
        message:"File format not supported",
      });
       }
     //  console.log("Upload m gadaad iske baad hui h");
   const response=await fileUploadToCloudinary(file,"soni",'image');
   console.log(response);
  // db k  andar entry save
  const fileData=await File.create({
    name,
    tags,
    email,
    imageUrl:response.secure_url,
  })
  res.json({
    success:true,
    message:"Image uploaded successfully",
  });
  }catch(error){
    console.log(error);
    res.status(400).json({
      success:false,
      message:"Something went wrong",
    })
  }
}