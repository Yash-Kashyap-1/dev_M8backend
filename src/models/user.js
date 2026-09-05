const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxlength : 19
    },
    lastName : {
        type : String,
        trim : true
    },
    
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },

    password : {
        type : String,
        required : true
    },

    age : {
        type : Number,
        min : 16
    },

    gender : {
        type : String,
        trim : true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Not a valid gender (Male , Female and other)");
            }
        }
    },

    photoURL : {
        type : String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFtV3uSOpLpHN4299H9FJ0Y5TZTYvKnVIvNNLrS5kz50hL9-RgL-NAmAs&s"
    },

    about : {
        type : String,
        default : "User didn't tell anything about him/her"
    },

    skills :{
        type : [String]
    },
    
    
},
    {
        timestamps : true
    }
);

const userModel = mongoose.model("user",userSchema);     //mongoose.model(nameofModel,schema)
module.exports = {userModel};