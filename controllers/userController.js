const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async(req,res) => {
    try{
        const {username, email, password} = req.body;

        //want to make sure user doesn't already exist
        const existingUser = await User.findOne({$or: [{username}, {email} ]}); //returns object for user document, or null
        if(existingUser){
            return res.status(400).json({
                status: false,
                message: "Username or email already exists!"
            });
        }

        const saltRounds = 10; //higher rounds make salts more secure, but also makes program less efficient. google says 10 is a good balance
        const hashedPass = bcrypt.hashSync(password, saltRounds);
        const newUser = new User({
            username,
            email,
            password: hashedPass //uses the hashed pass instead of the one from request body
        });

        await newUser.save();
        res.status(201).json({
            status: true,
            message: "User created successfully"
        });


    }catch(error){
        console.log(error);
    }

};

exports.login = async(req,res) => {
    try{
        const {username, password} = req.body;
        
        //want to make sure this user exists. 
        const existingUser = await User.findOne({ $or: [{username}, {email} ]}); //returns object for user document, or null
        if(!existingUser){
            return res.status(400).json({
                status: false,
                message: "Invalid username or password! :["
            });
        }

        //check given password with stored
        const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
        if(!isPasswordValid){
            return res.status(400).json({
                status: false,
                message: "Invalid username or password! :["
            });
        }

        //at this point, the user has authenticated, so we can work on generating a JWT as per optional assignment requirement

        const token = jwt.sign({userId: existingUser._id}, 'secretKey', {expiresIn: '1h'});

        return res.status(200).json({
            status: true,
            message: "Successfully logged in!",
            token
        });


    }catch(error){
        console.log(error);
    }

};