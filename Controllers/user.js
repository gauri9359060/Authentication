const userModel = require("../Models/user")
const JWTService = require("../CommonLib/JWTToken")
const encryptDecryptService = require("../CommonLib/encryptionDecription")

async function login(req,res,next){

    //Validate email and password
    const userDetails = await userModel.findOne({email:req.body.email});
    console.log(userDetails,req.body.password)
     const isValidPassword = encryptDecryptService.decryptPassword(req.body.password,userDetails.password)
if(isValidPassword){
    let userDetail = {
        "email" : userDetails.email,
        "name": userDetails.name,
    }
    //Generate JWT token and send back to frontend
    let  JWTToken =JWTService.generateToken(userDetail)
    res.json({
      status: "sucess",
      token : JWTToken
    })
}
else{
    res.json("Password Not Valid")
}
   
}

async function register(req,res,next){
    let userDetail = req.body;
    console.log(userDetail)
    const encryptedPassword = encryptDecryptService.encryptPassword(userDetail.password);
     userDetail.password = encryptedPassword;
     console.log(userDetail)
     console.log(encryptedPassword)
     const response =  await userModel.insertMany([userDetail])
     res.json(response)
}

module.exports= {
    login,
    register
}