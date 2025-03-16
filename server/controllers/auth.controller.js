import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRE } from "../config/env.js";

export const signup = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction(); 

    try {
        const { name, email, password,address,phone } = req.body;

        const existingUser = await User.findOne({ email }).session(session); 

        if (existingUser) {
            await session.abortTransaction(); 
            session.endSession();
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = await User.create([{ name, email, password: hashedPassword ,address :address,phone:phone}], { session });
        
        const token = jwt.sign({ userId: newUser[0]._id.toString() }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: { token, user: newUser[0] }, 
        });
    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction(); 
        }
        session.endSession();
        next(error);
    }
};

export const signin = async (req, res, next) => { 
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "User does not exist" });
        }
       
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: existingUser._id.toString() }, JWT_SECRET, { expiresIn: JWT_EXPIRE });

        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: { token, user: existingUser },
        });
    } catch (error) {
        next(error);
    } 
};

export const signout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "User signed out successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error signing out",
        });
    }
};
