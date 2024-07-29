const mongoose=require('mongoose');
require("dotenv").config();
const nodemailer=require('nodemailer');
const fileSchema=new mongoose.Schema({

   name:{
       type:String,
       required:true,
   },
   imageUrl:{
     type:String,
   },
   tags:{
    type:String,
   },
   email:{
    type:String,
   }
});

// creating post middleware
// fileSchema.post("save",async function(doc){
//    try{
//        console.log(doc);
//        let transporter=nodemailer.createTransport({
//         host:process.env.MAIL_HOST,
//         port: 587, // or 465 for SSL
//         secure: false, // true for 465, false for other ports
//         auth:{
//           user:process.env.MAIL_USER,
//           pass:process.env.MAIL_PASS,
//         },
//        });transporter.verify(function(error, success) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log("Server is ready to take our messages");
//         }
//     });

//        // send mail
//        let info=await transporter.sendMail({
//         from:`Soni Rathore`,
//         to:doc.email,
//         subject:`Image upload to cloudinary`,
//         html:`<h2>Thank you for using our services</h2>  <br>view image <a href="${doc.imageUrl}">${doc.imageUrl}</a> to upload`  ,
//            });

//            console.log(info,"Info");
//    }
//    catch(error){
//     console.log(error);
//    }
// })
console.log(process.env.MAIL_HOST);
console.log(process.env.MAIL_PASS);
console.log(process.env.MAIL_USER);

fileSchema.post("save", async function (doc) {
  try {
      console.log(doc,"document");

      let transporter = nodemailer.createTransport({
          service: 'gmail',
          host: process.env.MAIL_HOST,
          port: 587, // or 465 for SSL
          secure: false, // true for 465, false for other ports
          auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS,
          },
      });

      transporter.verify(function(error, success) {
          if (error) {
              console.log(error);
          } else {
              console.log("Server is ready to take our messages");
          }
      });

      let info = await transporter.sendMail({
          from: `Soni Rathore <${process.env.MAIL_USER}>`,
          to: doc.email,
          subject: `Image upload to cloudinary`,
          html: `<h2>Thank you for using our services</h2><br>View image <a href="${doc.imageUrl}">${doc.imageUrl}</a> to upload`,
      });

      console.log(info, "Info");
  } catch (error) {
      console.log(error);
  }
});
const file=mongoose.model("file",fileSchema);
module.exports=file;


