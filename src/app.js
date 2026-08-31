// starting point of your application
// main core js file where you will write all the node js code 

const express = require('express'); 


const app = express();   // instance of express js application 

// for handling requests we write app.use()
// This function is known as request handler......
// app.use((req,res)=>{
//     res.send("I created my first server!!");   // for any request response will be this only 
// });

// giving response for a route 
// localhost:3000/test/xyz ==>> give same output "Testing on a route"
// This handler "/test" will also handle anything that comes after /test   like /test/123 will match but /test123 this won't match as test123 is a different string 
//This will match all HTTP methods API calls to /test
app.use("/test",(req,res)=>{          
    res.send("Testing on a route");
}); 


// app.use("/user",(req,res)=>{        THE ORDER MATTERS MY FRIEND now for every put, delete, get api call you will get HAHAHAHAHA!
//     res.send("HAHAHAAHAA");         all https methods API calls are handled over here 
// });

// This will match/handle only GET method API call to /user
app.get("/user",(req,res)=>{
    res.send({
        firstName:"Rajesh",
        lastName : "Kumar"
    });
});

// now this will handle request to Post Method API call to /user
app.post("/user",(req,res)=>{
    // saving data to db
    console.log("Save data to the database");
    res.send("Data saved to database successfully");
});

// This will handle only Delete call to user 
app.delete("/user",(req,res)=>{
    res.send("User successfully deleted");
});



// app.use("/hello/123",(req,res)=>{
//     res.send("Abra ka Dabra");
// });

// app.use("/hello",(req,res)=>{
//     res.send("Hello My friend all set all good");
// });     // order of routes matter 



// app.use("/buffalo",(req,res)=>{
//     res.send("Hey do u like buffalo's milk or cow's milk??");
// });



// for any request, response will be this only, any thing that matches after / this route handler will handle this if it is place at top 
// app.use("/",(req,res)=>{  
//     res.send("I created my first server!!");   
// });

/* web server created on port 3000 => (this is the port on which you want your application to be running on) 
and app is listening on that server and the callback function will only be called once the server is up and running*/
app.listen(3000, ()=>{
    console.log("server is successfully listening on port 3000..."); // this is printed only when server has started successfully...
});   

// closing and opening the servers again and again is very annoying 
// After writing new routes you have to run the server again, to handle the new requests so here comes nodemon in picture
// node i -g nodemon ==> -g means install nodemon at a global level. You save the file after making changes in it server reruns on its own.
// Hence, nodemon automatically refreshes the server on its own.....

// Installing nodemon globally means you do not need to install it again for future projects on this machine. 
// It is installed globally across your entire computer, not just inside your current project folder.


