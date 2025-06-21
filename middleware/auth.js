const jwt = require('jsonwebtoken')
require('dotenv').config()


const auth = (req,res,next) =>{
    // console.log(req.headers,"This is headers*****")
tokenBearer = req.headers.authorization
    // console.log(tokenBearer,"Token with Bearer")
if(!tokenBearer?.startsWith('Bearer ')){
    res.send({message:"Invalid authorization header"})
}
let token = tokenBearer.split(' ')
token = token[1]
// console.log(token)
let decoded = jwt.verify(token,process.env.SECREATE_KEY)
console.log(decoded)
req.user = decoded   //{id:decoded.id,isADmin:decoded.isAdmin}

next();
}


const isAdmin = (req,res,next)=>{
console.log(req.user)

if(!req.user.isAdmin){
    res.status(401).send({message:"Unauthorized user"})
}


next();

}


module.exports = {auth, isAdmin}