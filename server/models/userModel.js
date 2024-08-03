const mongoose = require("mongoose");

//CREATING A USER SCHEMA
const userSchema = new mongoose.Schema({
    name: {type: String, required: true, minLength: 3, maxLength: 20},
    email: {type: String, required: true, minLength: 3, maxLength: 200, unique: true},
    password: {type: String, required: true, minLength: 3, maxLength: 200},
},
{
    timeStamps: true,
}
);
//Timestamps: The second parameter of mongoose.Schema() is an options object. timestamps: true is an option 
//that tells Mongoose to automatically add createdAt and updatedAt fields to the documents using the schema. 
//These fields will automatically record the creation and last update times of each document.

//NOW WE HAVE CREATED A USER SCHEMA, WE CAN CREATE NOW WHAT WE CALL A MODEL AND OUR MODEL IS WHAT WILL GIVE US 
//VARIOUS METHODS WHICH WE CAN USE TO SAVE THE DATA TO THE DATABASE , RETREIVE DATA FROM THE DATABASE 
const userModel = mongoose.model("User", userSchema) //first parameter is the name of our collection(collection is like a table) 
//mongoose automatically turns it to plural form therefore we will have a collection called Users

//Now we have to export our model so that we can use it to enter data in our database
module.exports=userModel;

//now go ahead and create a userRoute