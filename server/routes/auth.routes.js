import { Router } from 'express';
import * as authentication from '../controllers/auth.controller.js';
const authrouter = Router();
import User from '../models/user.model.js';
import twilio from 'twilio/lib/rest/Twilio.js';
import {TWILIO_PHONE_NUMBER, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, JWT_SECRET, JWT_EXPIRE} from "../config/env.js";
import jwt from 'jsonwebtoken';
const client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
import optmiddelware from "../middlewares/optauth.middleware.js";

authrouter.post('/signUp', authentication.signup);
authrouter.post('/signIn', authentication.signin);
authrouter.post('/signOut', authentication.signout);

authrouter.post('/send-otp', async (req, res) => {
    const { phone, name, email, password, address } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 min
    
    try {
        let user = await User.findOne({ phone });
        
        if (!user) {
            // Create new user with all required fields
            user = new User({ 
                phone, 
                otp, 
                otpExpires,
                // Add required fields with default values if not provided
                name: name || 'Unnamed User',
                email: email || `user${Date.now()}@example.com`,
                password: password || Math.random().toString(36).slice(-8), // Random password
                address: address || 'No address provided'
            });
        } else {
            // Update existing user's OTP information
            user.otp = otp;
            user.otpExpires = otpExpires;
        }
        
        await user.save();
        
        // Send OTP via SMS (Twilio example)
        await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: TWILIO_PHONE_NUMBER,
            to: phone
        });
        
        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: `Error sending OTP ---${error}` });
    }
});

authrouter.post('/verify-otp', async (req, res) => {
    const { phone, otp } = req.body;
    
    try {
        const user = await User.findOne({ phone });
        
        if (!user || user.otp !== otp || new Date() > user.otpExpires) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }
        
        user.otp = null;
        user.otpExpires = null;
        await user.save();
        
        const token = jwt.sign({ phone: user.phone }, JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ message: 'OTP verified', data: { token, user } });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP' });
    }
});
    
export default authrouter;