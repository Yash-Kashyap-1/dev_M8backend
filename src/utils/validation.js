const validator = require("validator");
// require("validator") export karta hai ek direct object, na ki koi named property validator


const validateSignupData = (req) => {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Enter a valid first name or last name");
    }else if(firstName.length > 19){
        throw new Error("Letter limit exceeded");
    }else if(!validator.isEmail(email)){
        throw new Error("Enter valid email id");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
};

module.exports = validateSignupData;