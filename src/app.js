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