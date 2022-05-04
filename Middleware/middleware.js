const JWTService = require("../CommonLib/JWTToken")


function isValidToken(req,res,next){
    try{
        const token = req.headers.token;
        const response = JWTService.verifyToken(token);
        next()
    }catch(error){
        res.json(error)
    }
}

module.exports ={
    isValidToken
}