const express = require("express");
const {connectDB} = require("./config/database");
const {userModel} = require("./models/user");
const validateSignupData = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");
const app = express();

app.use(express.json()); // Now our middleware will be activated for all the routes 
app.use(cookieParser());// Now when the request will come you will be able to read the cookies back

app.post("/signup",async (req,res)=>{
    
    try{
    // First thing should be the validation of the data
    validateSignupData(req);
    

    const {firstName, lastName, email, password} = req.body;
    // After this encrypt the password and then store the user in database

    const passWordHash = await bcrypt.hash(password, 10);  // this is also an asynchronous o/pn and it returns a promise
    console.log(passWordHash);
    
    // console.log();
    const u1 = new userModel({
        firstName, lastName, email, password : passWordHash
    });  // creating a new instance of user model 

    await u1.save(); // this data will be saved to our database and this fxn will return you a promise 
    res.send("User added successfully to database!")
    }catch(err){
        res.status(400).send(`Error: ${err.message}`);
    }
});

// A login API uses the HTTP POST method primarily because it is the most secure, 
// functional, and semantically correct choice for handling sensitive user credentials.

app.post("/login", async (req,res)=>{

    // Login Authentication 
    try{
        const {email, password} = req.body;
        // First we will check if the user with the given email has sign up earlier or not which means 
        // the user exists in our app or not basically check if the email id is there in the database or not 
        const user = await userModel.findOne({email : email});
        if(!user){
            throw new Error("user doesn't exist// Invalid credentials"); // The attaker should not know whether your password was wrong or email id was wrong
        }
        const isPasswordValid = await bcrypt.compare(password, user.password); // This is also a promise and returns true or false

        if(isPasswordValid){

            // Create a JWT Token
            const token = await jwt.sign({_id : user.id}, "DEV@TINDER",{expiresIn : "1d"})            // create the token hiding the user id in it and sending it back to user 
            console.log(token);

            // Add the token to cookie and send the response back to user
            res.cookie("token", token, {expires : new Date(Date.now() + 8 * 3600000)});
            res.send("Login successful");
        }
        else{
            throw new Error("Invalid Password!!"); 
        }
    }catch(err){
        res.status(400).send("Error: "+err.message);
    }

});


// app.get("/profile", async (req,res)=>{
//     try{                                                      before auth Middleaware 
        
//     const cookies = req.cookies;


//     const {token} = cookies;

//     if(!token){
//         throw new Error("Please login again");
//     }

//     // Validate the token if validation done, then serve the request i.e send the response else login again(When token is expired)
//     const isTokenValid = jwt.verify(token,"DEV@TINDER");  // jwt.token(token, secret Key)
//     //this does not give you a boolean it gives you a decoded message
//     // console.log(isTokenValid);
//     const { _id } = isTokenValid;
//     console.log("Logged in user is "+_id);
//     const user = await userModel.findById(_id);
//     // console.log(cookies);
//     // console.log(token);
//     if(!user){
//         throw new Error("Login failed");
//     }
//     res.send(user);
//     }catch(err){
//         res.send(err.message);
//     }
// });

app.get("/profile", userAuth, async(req,res)=>{   // After using Auth middleWare 

    try{
        const user = req.user;
        res.send(user);

    }catch(err){
        res.send("Error: "+ err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async (req,res)=>{
     
    const user = req.user;

    console.log("Send connection Request");


    res.send(user.firstName +" sent Connection Request");
});

// Get user by email
app.get("/user/email", async (req,res)=>{
    const userEmail = req.body.email;

    try{
        const user = await userModel.find({email : userEmail});
        if(user.length == 0){
            res.status(404).send("Hey no one found");
        }
        else
        {   console.log("user data fetched via email!");
            res.send(user);
        }
    }catch (err){
        res.status("404").send("Something went wrong");
    }
});


app.get("/user/gender", async (req,res)=>{

    const userGen = req.body.gender;
    try{
        const userDet = await userModel.findOne({gender : userGen});
         if(userDet.length === 0){
            console.log("No one's here!");
            res.status(400).send("Hey no one found");
        }
        console.log("Got the data you requested:)");
        res.send(userDet);
    }catch(err){
        res.status("404").send("Hey dude couldn't get the data you requested");
    }
});

app.delete("/delete/gender",async (req,res)=>{

    const userGen = req.body.gender;

    try{
        const userDel = await userModel.deleteOne({gender : userGen});
        res.send("User deleted successfully"); 
    }catch(err){
        res.status("404").send(err.message);
    }
});



// Feed API => GET/feed -> get all users from the database 
app.get("/feed",async (req,res)=>{
    // whenever you have to get data from database you should know which model you have to use 
    // If you pass an empty filter it will get you all the documents from that collection
    

    try{
        const allUser = await userModel.find({});
        res.send(allUser);
    }catch(err){
        res.status(404).send("Something went wrong");
    }
});

app.patch("/update/:uid", async (req,res)=>{

    const uid = req.params?.uid;
    const data = req.body;

    try{
        const ALLOWED_UPDATES = [
            "firstName","lastName","photoURL","age","skills","about","gender","password"
        ];

        const isUpdAllowed = Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));

        if(!isUpdAllowed){
            throw new Error("dude can't change this");
        }

        if(data?.skills.length > 10){
            throw new Error("Please enter only 10 Skills ");
        }
        const updatedDoc = await userModel.findByIdAndUpdate({_id : uid}, data, {runValidators : true});
        res.send("Updates done!!");
    }catch(err){
        res.send("Error "+err.message);
    }
});

    //   const ALLOWED_UPDATES = [
    //       "photoURL",
    //       "about",
    //       "gender",
    //       "skills",
    //       "firstName",
    //       "lastName",
    //       "age"
    //   ];

    //   const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

    //   if (!isUpdateAllowed) {
    //       throw new Error("Update Not Allowed")
    //   }



























// app.patch("/update/age", async (req,res)=>{
//     const un = req.body.firstName;
//     const uage = req.body.age;

//     try{
//         const changeAge = await userModel.findOneAndUpdate({firstName : un}, {age : uage}, {
//             runValidators : true
//         });
//         res.send("age updated successfully!");
//     }catch(err){
//         res.status(400).send("age update failed!");
//     }
// });




// app.patch("/update/gender", async (req,res)=>{
//     const un = req.body.firstName;
//     const ugen = req.body.gender;

//     try{
//         const changeAge = await userModel.findOneAndUpdate({firstName : un}, {gender : ugen}, {
//             runValidators : true,
//             returnDocument : "after"
//         });
//         res.send("gender updated successfully!");
//     }catch(err){
//         res.status(400).send(`gender update failed! because ${err.message}`);
//     }
// });



app.get("/",(req,res)=>{
    res.send("Testing server ==> Test passed!!");
});



// API to update the data of the user











connectDB()
.then(() => {
        console.log("Database connection established");
        app.listen(3000,()=>{
        console.log("server connection established");
    });
    })
    .catch((err) => {
        console.error("DB connection failed:", err);
    });


// dont try to mess up with the automatic fields of mongodb