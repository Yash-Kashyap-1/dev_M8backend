const express = require("express");
const {connectDB} = require("./config/database");
const {userModel} = require("./models/user");
const app = express();

app.use(express.json()); // Now our middleware will be activated for all the routes 

app.post("/signup",async (req,res)=>{
    

    // console.log();
    const u1 = new userModel(req.body);  // creating a new instance of user model 

    try{await u1.save(); // this data will be saved to our database and this fxn will return you a promise 
    res.send("User added successfully to database!")
    }catch(err){
        res.status(400).send("Nhi hua data add",err.message);
    }
});


// Get user by email
app.get("/user/email",async (req,res)=>{
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









connectDB()
.then(() => {
        console.log("Database connection established");
        app.listen(7777,()=>{
        console.log("server connection established");
    });
    })
    .catch((err) => {
        console.error("DB connection failed:", err);
    });


// dont try to mess up with the automatic fields of mongodb