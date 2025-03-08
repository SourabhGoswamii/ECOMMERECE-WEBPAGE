import { Router } from 'express';
import * as authentication from '../controllers/auth.controller.js';
const authrouter = Router();

authrouter.post('/signUp', authentication.signup);
authrouter.post('/signIn', authentication.signin);
authrouter.post('/signOut', authentication.signout);

export default authrouter;
