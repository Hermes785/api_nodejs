//const { model } = require('mongoose');
const UserModel = require('../Models/User.model');
const bcrypt =require('bcrypt');

module.exports.getUser= async (req,res)=>{
    const user = await UserModel.find();
    res.status(200).json(user);
}
module.exports.createUser= async (req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
   
    if (!req.body.name || !req.body.first_name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: "Missing required fields" });
      }
 const user= await UserModel.create({
    name: req.body.name,
    first_name:req.body.first_name,
    email:req.body.email,
    password:hashedPassword
    
  


 })
 if(user){
    console.log(req.body)
    res.status(200).json(user)


 }else{
    //Générer un token JWT en utilisant la bibliothèque jsonwebtoken, en y incluant l'ID de l'utilisateur nouvellement créé
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '24h' });
  
  
    res.status(400).json({message:"une erreur est survenue"})

 }

 module.exports.UpdateUser = async(req,res)=>{
   const user=await UserModel.findById(req.params.id)
   if(!user){
        res.status(404).json({ message: 'user not found' }) 
   }
   const User = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.status(200).json(User);
 }

}

module.exports.DeleteUser= async(req,res)=>{
    const user= await UserModel.findById(req.params.id)
    if(!user){
        res.status(400).json({message: "User not found"})
    }
 const User= await UserModel.findByIdAndDelete(req.params.id , req.body,{new:true});
}

