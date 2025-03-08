import { Router } from "express";
import authorization from "../middlewares/auth.middleware.js";
import adminauthorization from "../middlewares/admin.middleware.js";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  cancelOrder,
  getOrdersByUserId,
} from "../controllers/order.controller.js"; // Import functions directly

const orderrouter = Router();

// Route Definitions
orderrouter.get("/", adminauthorization, getAllOrders);
orderrouter.get("/user/:id", authorization, getOrdersByUserId); // Fixed order
orderrouter.get("/:id", authorization, getOrderById);
orderrouter.post("/", authorization, createOrder);
orderrouter.put("/:id", adminauthorization, updateOrder);
orderrouter.delete("/:id", authorization, cancelOrder);

export default orderrouter;
