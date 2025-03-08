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
        const { name, email, password } = req.body;

        let updatedFields = { name, email };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(password, salt);
        }

        const user = await User.findByIdAndUpdate(
            req.params.id, 
            updatedFields, 
            { new: true, runValidators: true } 
        );

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