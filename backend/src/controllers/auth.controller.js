import User from "../models/User.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export async function signup(req, res) {
    const { email, password, fullName } = req.body;

    try {
        if(!email || !password || !fullName){
            return res.status(400).json({message: "All fields are required"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Passwords must be at least 6 characters"});
        }

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

        if(!emailRegex.test(email)){
            return res.status(400).json({message: "Invalid email format"});
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: "Email already existed, please use a different email"});
        }

        const idx = Math.floor(Math.random() * 100) + 1; //generate the random number from 1-100
        const randomAvatar = `https://api.dicebear.com/9.x/avataaars/svg?seed=${idx}`;

        const newUser = await User.create({
            email,
            fullName,
            password,
            profilePic: randomAvatar,
        })

        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 *1000,
            httpOnly: true, //prevent XSS attacks,
            sameSite: true, //prevent CSRF attacks,
            secure: process.env.NODE_ENV === "production"   //for https when on production
        })

        res.status(200).json({success: true, user: newUser});

    } catch (error) {
        console.error(`Error in sign up controller: ${error}`);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export async function login(req, res) {
    try {
        const {email, password} = req.body;
        // No need to add validators at the time of login
        if(!email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid email or password"});
        }

        const isPasswordCorrect = await user.matchPassword(password);

        if(!isPasswordCorrect){
            return res.status(401).json({message:"Invalid email or password"}); //sending invalid email or password creates the authentication more secure as user can't know the email is present in the database or not 
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d"
        })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 *1000,
            httpOnly: true, //prevent XSS attacks,
            sameSite: true, //prevent CSRF attacks,
            secure: process.env.NODE_ENV === "production"   //for https when on production
        })

        return res.status(200).json({success:true, user});

    } catch (error) {
        console.error(`Error in login controller: ${error}`);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export function logout(req, res) {
    res.clearCookie("jwt")
    res.status(200).json({success:true, message:"Logout successfull"});
}