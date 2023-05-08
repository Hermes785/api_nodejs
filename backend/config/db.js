const  mongoose  = require("mongoose");

// mettre le lien de la bd dans le .env pour eviter que tous le monde est acces a cette base donnee lors des push sur github
 const connectDB= async()=>{
try{
    mongoose.set('strictQuery',false);
  if(mongoose.connect(process.env.MONGO_URI)){ 
    console.log("MONGO CONNECT")}
}catch(err){
     console.log(err);
     process.exit();
}
 }
 module.exports=connectDB;