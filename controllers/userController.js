import userModel from "../modals/userModal.js";
import jwt from 'jsonwebtoken'
import bycrypt from 'bcrypt'
import validator from 'validator'

//Login funstion
const loginUser = async(req, res) => {
    const { email, password} = req.body

    try{
        const user = await userModel.findOne({ email})
        if(!user){
            //return res.json({success: false, message: "User Don't Exist"})
            return res.status(400).json({
        success: false,
        message: "Invalid credentials"
    });
        }

        const isMatch = await bycrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
        success: false,
        message: "Invalid credentials"
    });
        }

        const token = createToken(user._id);
        res.json({ success: true, token })
    }

    catch (error){
        console.log(error)
        res.json({ success:false, message: "Error"})

    }
}


// crate a token
const createToken = (id)=> {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

//register function
const registerUser = async(req, res) => {
    const {username, password, email} = req.body;

    try{
        const exists = await userModel.findOne({ email })
        if(exists) {
            return res.json({ success: false, message: "User Already Exists"})
        }


        //Vlaidation
        if(!validator.isEmail(email)){
            return res.json({ success: false, message: "Please Enter a valid Email"})
        }

        if(password.length < 8){
            return res.json({ success: false, message: "Please Enter a Strong Password"})
        }

        //IF EVERYTHNG WORKS 
        const salt = await bycrypt.genSalt(10)
        const hashedPassword = await bycrypt.hash(password, salt)


        //NEW USER
        const newUser = new userModel({
            username: username,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({ success: true,token})
    }

    catch (error){
        console.log(error)
        res.json({ success:false, message: "Error"})

    }
}


const googleSignup = async (req, res) => {
    const { email, username } = req.body;

    try {
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please login.",
            });
        }

        const newUser = await userModel.create({
            username,
            email,
            password: ""
        });

        const token = createToken(newUser._id);

        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


export { loginUser, registerUser, googleSignup }