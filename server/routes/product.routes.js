import { Router } from "express";
import adminauthorization from "../middlewares/admin.middleware.js";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory, 
  getProductByName,
  getProductByPrice,
} from "../controllers/product.controller.js"; 

const productroutes = Router();

// Get current directory path (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Created uploads directory at: ${uploadsDir}`);
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Accept only image files
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images (jpeg, jpg, png, gif, webp).'), false);
  }
};

// Error handling for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific error
    return res.status(400).json({ 
      success: false, 
      message: `Upload error: ${err.message}` 
    });
  } else if (err) {
    // Other errors
    return res.status(500).json({ 
      success: false, 
      message: `Error during file upload: ${err.message}` 
    });
  }
  next();
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Add error handler middleware after multer
productroutes.use(handleMulterError);

// Basic product routes
productroutes.get("/", getProducts);
productroutes.get("/name/:name", getProductByName);
productroutes.get("/price/:price", getProductByPrice);
productroutes.get("/category/:category", getProductByCategory); 
productroutes.get("/:id", getProduct);

// Routes with file upload middleware
productroutes.post("/", 
  adminauthorization, 
  upload.single('productImage'), 
  (req, res, next) => {
    console.log("File received:", req.file);
    console.log("Form data:", req.body);
    next();
  },
  createProduct
);

productroutes.put("/:id", 
  adminauthorization, 
  upload.single('productImage'),
  (req, res, next) => {
    console.log("Update file received:", req.file);
    console.log("Update form data:", req.body);
    next();
  },
  updateProduct
);

productroutes.delete("/:id", adminauthorization, deleteProduct);

export default productroutes;