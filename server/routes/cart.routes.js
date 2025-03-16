import {Router} from "express";
import * as cart from "../controllers/cart.controller.js";
import authorization from "../middlewares/auth.middleware.js";
const cartrouter = Router();

cartrouter.get("/", authorization, cart.getCart);
cartrouter.post("/add", authorization, cart.addToCart);
cartrouter.delete("/:id", authorization, cart.removeFromCart);
cartrouter.put("/:id", authorization, cart.updateCart);
cartrouter.post("/checkout", authorization, cart.checkout);


export default cartrouter;