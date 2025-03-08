import {Router} from "express";
import * as cart from "../controllers/cart.controller.js";
import authorization from "../middlewares/auth.middleware.js";
import adminauthorization from "../middlewares/admin.middleware.js";
const cartrouter = Router();

cartrouter.get("/:id", authorization, cart.getCart);
cartrouter.post("/", authorization, cart.addToCart);
cartrouter.delete("/:id", authorization, cart.removeFromCart);
cartrouter.put("/:id", authorization, cart.updateCart);
cartrouter.post("/checkout", authorization, cart.checkout);


export default cartrouter;