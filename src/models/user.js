const mongoose = require("mongoose");
const validator = require("validator");

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
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email address!!"+value);
            }
        }
    },

    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter a better Password!");
            }
        }
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
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFtV3uSOpLpHN4299H9FJ0Y5TZTYvKnVIvNNLrS5kz50hL9-RgL-NAmAs&s",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Please enter a valid URL");
            }
        }
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

// for jwt
    userSchema.methods.getjwt = async function () {  // Arrow function will break things up here(this keyword doesn't work with arrow function)

    const user = this; // Represents the instances of a user model // this refers to the particular instance which is logging in
    const token = await jwt.sign({_id : user.id}, "DEV@TINDER",{expiresIn : "1d"});

    

    return token;
}


// for password validation
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isValidPassword = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isValidPassword;

}





const userModel = mongoose.model("user",userSchema);     //mongoose.model(nameofModel,schema)
module.exports = {userModel,getjwt};

