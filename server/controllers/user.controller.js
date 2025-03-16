import User from "../models/user.model.js";
import bcrypt from "bcrypt";


export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            const error =new Error("User not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: user});
    } catch (error) {
        next(error);
    }
}

export const createUser = async (req, res, next) => {
    try{
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password ,role : "admin"});
        res.status(201).json({ success: true, data: user });

    } catch (error){
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updates = {}; // Store only provided fields

        // Add only the fields that are provided in the request
        Object.keys(req.body).forEach((key) => {
            if (req.body[key] !== undefined && req.body[key] !== "") {
                updates[key] = req.body[key];
            }
        });

        // If password is provided, hash it before updating
        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true, // Return updated document
            runValidators: true, // Ensure data validation
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User updated successfully", data: user });

    } catch (error) {
        next(error);
    }
};


export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });

    } catch (error) {
        next(error);
    }
}