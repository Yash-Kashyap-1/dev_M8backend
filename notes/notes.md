data should not be harcoded by us it must be like the user submits the data through html form and from there you receive the data and then that data is stored in the database.
while testing from postman we should send the data right from postman so that it is saved to the database. API receives the data and pushes it to database.
You send the Json data the server should read it push it to database.
Data which is sent is sent in JSON format and our server is not able to read that JSON data to read that Json data we need help of a middleware. Middleware will check the incoming requests and can read JSON and convert in into JS object put it into body and give us access to data in code. 
express.json() ==> middleware does ==>reads JSON obj ==>converts it into js object ==>It adds js object back to this request obj in the body ==> now req.body is a js object  
All database operations are asynchronous in nature.....


Nextday

post and patch api are the one's which are inserting some data into the database............
By default, Validate method will only be called when a new document is created/that is when a post api call is made.
This validate function will not run by default when you try to update a field using Patch method. You have to enable it to run on updates also. ==> runValidators : true in the model.findOneAndUpdate



Maye you don't have UI validations but you must always have backend validations

{timestamp is passed as the second argument in mongoose.Schema}
Your database should not be polluted ==>> If you are a good coder you should validate everything you can't just trust everything that comes from user side
==> Never in your life trust Req.body
