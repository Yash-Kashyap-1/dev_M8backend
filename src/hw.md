// day1 
-- create a repository
--Initialize the repository
--node_modules, package.json, package-lock.json
-- install express in your app 
-- create a server
-- listen to port 7777
-- Make/write request handlers for /test, /hello
-- Install nodemon and update scripts inside package.json
-- Difference b/w ~ and ^ 
-- what are dependencies 
-- what is the use of -g while install npm 


// day2 
--initialize git
-- .gitignore 
-- why to push package-lock.json to github
-- create a remote repo on github
-- push all code to remote origin
-- Play with route and route-extensions ex. /hello, /hello/2u, /xyz
==>> NOTE : Order of the routes matter a lot
-- Install postman app and make a workspace/collection and then ==> test api call
-- Write logic to handle GET, POST, PATCH, DELETE API calls and test them on postman
-- Explore routing and use of ?,*,+,() in routes.
-- Use of Regex in Routes /a/ /.*fly$/


// day3 

//day4
install mongoose library
connect your application to db of cluster 
call the connectDB fxn and connect to DB before starting application on 7777
create a user schema and usermodel yourself and can add as many fields you want to 
crate a post signup api to add data to database and then push some documents using Post API calls using PostMan.



//day5

difference b/w js object and json
can't hava a comma at the end in json
Add the express.json() middleware to your app 
Make your signup api dynamic to receive data from the end user/postman
user.findOne() with duplicate email id which object will be returned 
build feed api that gets all the users 
create an api-Get User by Id
create a delete API to delete a user by model id method
difference b/w patch and put
create a delete user api
create an update user api 
explore mongoose doc for model
What are options in Model.findOneandUpdate methods
===>> create an api which updates the user using email id like user id sai refer na krke email id sai document refer krke usko update krne ka hai  ==> used find one and update



// day6

explore schematype options from the documentation
add unique, required , lowercase , default, trim 
create a custom validate function for gender
Improve the database schema - put appropriate validations on each field in schema 
Add timestamps to the user schema 
Add API level validation on Patch Request & signup post api 
Add API validations for each field in schema 
Install validator library and explore the methods it has and use them 

