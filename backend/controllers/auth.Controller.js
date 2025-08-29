
import User from "../models/user.Models.js";
import { log } from "console";
import generateToken from "../utils/Token.JWT.Utlis.js";
import { hashPassword, verifyPassword } from "../utils/bcrypt.Utlis.js";

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();

        const token = generateToken(newUser._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token,
        });

        // return res.redirect('/dashboard')

    } catch (error) {
        log(error);
        return res.status(500).json({ message: "Internal server error" });
    
    }
};

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" });
        };

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User does not exist" });
        };

        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
        };

        const token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
        // return res.redirect('/dashboard')

    } catch (error) {
        log(error);
        res.status(500).json({ message: "Internal server error" });
    };
};

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: 'strict',
        maxAge: 0,
        });

        res.status(200).json({ message: "Logged out successfully" });
        // res.redirect('/')
    } catch (error) {
        log(error);
        res.status(500).json({ message: "Internal server error" });
    };
};

export { registerUser, loginUser, logoutUser };