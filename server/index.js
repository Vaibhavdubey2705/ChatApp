// 1. REQUIRING LIBRARIES

//This line imports the Express framework, which is a popular Node.js framework used for building web 
//applications and APIs.
const express = require("express");
const mongoose = require("mongoose");
//This initializes an instance of the Express application, which will be used to define routes and 
//handle HTTP requests.
const cors = require("cors");
//importing our user route
const userRoute = require("./routes/userRoute");

const app=express();


//2. CONFIGURING
//CONFIGURE OUR .env file to use it here
require("dotenv").config();

//This line adds middleware to parse JSON bodies sent in the HTTP request. It enables the application to
//handle JSON data easily.
app.use(express.json());
//This line adds the CORS middleware to the Express application. It allows the server to respond to requests
// from different origins (domains) other than its own, which is essential for enabling communication between 
//the frontend and backend of a web application.
app.use(cors());
app.use("/api/users" , userRoute);
 
//3. CONNECTING TO MONGODB DATABASE

//the first parameter is our URI but this uri is a connection string present in 
//our .env file therefore it is an environment variable and to bring it here we use process.env.port(default available
//in node js to read environment variables), so we will create a variable uri and specify the name of our variable
//i.e ATLAS_URI in process.env
const uri = process.env.ATLAS_URI
mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log("MongoDB connection established"))
.catch((error) => console.log("MongoDB connection Failed:" ,error.message));


app.get("/", (req,res) => {
    res.send(" Welcome to our chat app");
})
//SETTING UP NODE.JS SERVER USING EXPRESS
//sometime the port that we have mentioned in not usually available when we host our application so what we have 
//to do is to set an automatic port which will be set automatically by the online server , || 5000 it is use to 
//give a defualt port 
const port = process.env.PORT || 5000;
app.listen(port, (req,res)=>{
    console.log(`server running on port : ${port}`);
})