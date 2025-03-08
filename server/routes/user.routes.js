import {Router} from 'express';
import * as users from "../controllers/user.controller.js";
import authorization from "../middlewares/auth.middleware.js";
import adminauthorization from "../middlewares/admin.middleware.js";
const userrouter = Router();

userrouter.get("/",adminauthorization, users.getUsers);

userrouter.get("/:id",authorization, users.getUser);

userrouter.post("/",adminauthorization, users.createUser);

userrouter.put("/:id",authorization, users.updateUser);

userrouter.delete("/:id",authorization, users.deleteUser);


export default userrouter;
