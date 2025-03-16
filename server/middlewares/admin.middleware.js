import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";


const adminauthorization = async  (req ,res ,next) =>{
    try {
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(401).json({message:"Not authorized to access this route"});
        }

        const decoded =jwt.verify(token,JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if (!user){
            return res.status(404).json({message:"No user found with this id"});
        }
        if(user.role !== "admin" && user.role !== "Admin"){
            return res.status(403).json({message:"Not authorized to access this route"});
        }
        req.user = user;

        next();

    } catch (error){
        return res.status(401).json({message:"Not authorized to access this route"});
    }
}

export default adminauthorization;