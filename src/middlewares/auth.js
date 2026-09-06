const jwt = require("jsonwebtoken");
const {userModel} = require("../models/user");


const userAuth = async (req, res, next) => {
    // Job of this middleware is to read the token from the request cookies 
   try{
        const cookies = req.cookies;

        const {token} = cookies;
        if(!token){
            throw new Error("Token is not valid");
        }

        

        const decodedMsg = await jwt.verify(token,"DEV@TINDER");

        const {_id} = decodedMsg;

        const user = await userModel.findById(_id);
        if(!user){
            throw new Error("User not found");
        }   
        req.user = user;
        next();
    }
    catch(err){
        res.send("Error: "+ err.message);
    }
     // Validate the token
    // Find the user 
}


module.exports = {userAuth};