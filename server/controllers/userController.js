const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

//FUNCTION TO CREATE A JWT TOKEN 
const createToken = (_id) =>{
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"});
}
const registeredUser = async (req,res) => {

    try{
        //WE WILL ACCESS THE DETAILS OF THE USER FROM THE FORM IN WHICH THEY ENTERED
        const {name, email, password} = req.body;
        
        //CHECKING IF THE USER ALREADY EXITS
        let user = await userModel.findOne({ email });
        if(user) return res.status(400).json(" user with the given email already exists...");
        
        //CHECK IF SOMETHING IS MISSING
        if(!name || !password || !email ) return res.status(400).json(" all fields are required...");
        
        //Validating entries if they are correct or not using VALIDATOR
        if(!validator.isEmail(email)) 
        return res.status(400).json(" A valid email is required...");
        // if(!validator.isStrongPassword(password))
        // return res.status(400).json(" The password must be unique and strong...");
        
        //AFTER CHECKING FOR ALL THE ENTRIES, NOW WE WILL REGISTER THE USER INTO OUR DATABASE
        user = new userModel({name, email, password})
        //BEFORE SAVING THE USERS DATA WE HAVE TO HASH THE PASSWORD
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password , salt);

        //SAVED THE USER IN DATABASE   
        await user.save();

        //AFTER SAVING USER IN THE DATAVBASE WE'LL GENERATE A JWT TOKEN
        const token = createToken(user._id);

        res.status(200).json({_id: user._id, name, email, token })
    
    }catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
}; 

//NOW WE HAVE TO CREATE CONTROLLER FOR LOGIN
const loginUser = async (req,res)=>{
    const {email, password} = req.body;
    try{
        //CHECK IF THE EMAIL EXIST OR NOT
        let user = await userModel.findOne({ email });
        if(!user) return res.status(400).json("user with this email does'nt exists ");

        //Validating password if it is correct or not
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) return res.status(400).json(" wrong email or password ...");

        const token = createToken(user._id);

        res.status(200).json({_id: user._id, name : user.name, email, token })
    
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

//CONTROLLER FOR FINDING A SINGLE USER
const findUser = async (req,res) =>{
    const userId = req.params.userId;
    try{
        const user = await userModel.findById(userId);
        res.status(200).json(user);
    }catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
}
//CONTROLLER FOR FINDING ALL USER
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find(); // Correct: find all users, no parameters
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//When you use curly braces {} around the exported value { registeredUser }, it means you are exporting an 
//object with a property named registeredUser, and its value is the function registeredUser that you defined earlier.
module.exports = { registeredUser , loginUser, findUser, getUsers};