In the Tcp/Ip protocol you make the API call get the data and then the connection is closed. Every time you are making an API call the user needs to validated means whether the request is coming from an authorized source or not which means the user should be logged in first.
Upon successful login:
The server generates a JWT token.(JSON WEB TOKEN)
The token is sent back to the client and stored in a cookie.
Subsequent requests use the token for validation.

How the user stores the JWT token sent by the server ?
cookie => On successful login, the server sends a successful response and alongwith it, it sends JWT token stored inside the cookie.

jab login karenge email password sai then server will validate the credentials first and then on successful login it generates JWT token stored or wrapped in a cookie and sends it back to client(Server sends the cookie to user back with the response).

When the cookie comes to the browser, it will store it and say you make some API call eg GET call so the cookie will also go and it will be validated and then the response is sent back to client.

For any API request made by the client/webBrowser the cookie will also travel to get validated.

There is also an expiry date of the JWT Token(say 1 day) or it can also be a case where the cookie doesn't expire lifetime.

Say suppose your cookie expired and now you are making a request/API call, because this cookie is already expired it will fail the validation and response will be please login again.

The JWT/token is kind of a temporary password which will come in all the request that will come to server.

After verifying the email and password, proceed to generate a JWT.
Token Creation:

A JWT token is created using the jsonwebtoken package with jwt.sign.
The token includes:
Header: Information about the token type and signing algorithm.
Payload: Contains user-specific data (e.g., user ID).
Signature: Ensures the token’s integrity.


A JWT token is known as JSON Web token. Header+Payload+Signature ==>> makes up the JWT Token
Header-> Red | Payload -> secret data inside the token hidden | Signature -> For checking whether the token is validated/actual or not  

For making all the API's to be secure we need to have a middleware which means all the api's will only work after authentication otherwise they should not work.
Create an Auth middleware and validate token's over there 

pehle userAuth chalega and agr token validate ho gaya shi sai then next call hoga aur api ka async(req,res) wala function phir chalega
agr userAuth middleWare error throw krdiya toh async wala functiion toh chalega bhi nhi 


You can expire the token as well as the cookies 

Expiring token in some limited time may not any harm but not expiring it may harm very hard sometime so better expire it.