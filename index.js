// instantiating express
const express=require('express');

// instantiating server
const app=express();
const cookieParser=require("cookie-parser");
app.use(cookieParser());
// finding dotenv configuration
require('dotenv').config();
const fileupload=require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
const PORT=process.env.PORT||4000;

// middleware 
app.use(express.json());
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const Upload=require('./routes/fileUpload');
app.use('/api/v1/upload',Upload);
const blog=require('./routes/blog');
app.use('/api/v1',blog);
const route=require('./routes/route');
app.use('/api/v1',route);
//database create karna
const database=require('./config/database');
database();


// activate server
app.listen(PORT,()=>{
    console.log('listening on port');
});

// default routes
app.get('/',(req,res)=>{
    res.send("Welcome to Express JS journey!");
});