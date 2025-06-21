// const User = require('../models/userModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser =async(req,res) =>{
    // console.log(req.body)
    // res.send("HELLO")
const {name,email,password} = req.body
    try {
    const userExits = await User.findOne({ email: req.body.email });
      if (userExits) {
        return res
          .status(200)
          .send({ message: "User already exits", success: false });
      }
        const newUser =  new User({name,email,password})
        await newUser.save();
        res.status(200).send({message:"User registered successfully", success:true})
    } catch (error) {
        res.status(500).send({error:error})
    }
}

const LoginUser = async(req,res)=>{
    const {email,password} = req.body
    try {
        const loggedInUser = await User.findOne({email:req.body.email,password:req.body.password})

        console.log(loggedInUser, "Login user") ;

        const user = {_id:loggedInUser._id,isAdmin:loggedInUser.isAdmin}
        const token = jwt.sign(user,process.env.SECREATE_KEY,{expiresIn:'1d'})
        console.log(token,"Token")
        res.status(200).send({message:"User Loggin successfully", success:true,token:token})
        
    } catch (error) {
        res.status(500).send({error:error})
        
    }
}

const getUserInfo =async (req,res) =>{
    console.log("req.user",req.user)
    try {

        loggedUser = await User.findOne({_id:req.user._id},{password:0, __v:0, createdAt:0})
res.status(200).send({message:"got user info",loggedUser:loggedUser})
            
    } catch (error) {
        res.status(500).send({error:error})
        
    }
}

module.exports = {
    registerUser,
    LoginUser,
    getUserInfo
}





