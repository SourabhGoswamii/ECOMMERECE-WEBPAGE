import mongoose from 'mongoose';

import { MONGO_URI } from '../config/env.js';

if(!MONGO_URI){
    throw new Error("Mongo URI is missing in the .env file");
}


const connectodatabase = async () => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully");
    } catch (error){
        console.log(error);
        process.exit(1);
    }
}


export default connectodatabase;