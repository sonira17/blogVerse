
const mongoose=require('mongoose');


require('dotenv').config();
const connectWithDb=()=>{
  mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  }).then(console.log("Connection successfully")).catch((err)=>{
    console.log("Error occured during connection",err);
    process.exit(1);
  });

};

module.exports=connectWithDb;