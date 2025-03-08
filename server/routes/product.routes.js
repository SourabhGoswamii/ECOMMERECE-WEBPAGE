import { Router } from "express";
import authorization from "../middlewares/auth.middleware.js";
import adminauthorization from "../middlewares/admin.middleware.js";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory, // Fixed typo
  getProductByName,
  getProductByPrice,
} from "../controllers/product.controller.js"; // Import functions directly

const productroutes = Router();

// Route Definitions
productroutes.get("/", getProducts);
productroutes.get("/search/name/:name", getProductByName);
productroutes.get("/search/price/:price", getProductByPrice);
productroutes.get("/category/:category", getProductByCategory); // Fixed order
productroutes.get("/:id", getProduct);
productroutes.post("/", adminauthorization, createProduct);
productroutes.put("/:id", adminauthorization, updateProduct);
productroutes.delete("/:id", adminauthorization, deleteProduct);

export default productroutes;
