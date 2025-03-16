import Product from "../models/product.model.js";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../config/env.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Configure Cloudinary
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

import path from 'path';

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, category, stock } = req.body;
        let imageUrl = null;
        let publicId = null;

        // Check if there's a file uploaded
        if (req.file) {
            // Upload to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "products",
                width: 800,
                crop: "scale"
            });
            
            imageUrl = result.secure_url;
            publicId = result.public_id;
            
            // Remove the temp file after upload
            fs.unlinkSync(req.file.path);
        }

        const product = await Product.create({ 
            name, 
            description, 
            price, 
            category,
            stock: stock || 0, 
            imageUrl: imageUrl,
            cloudinaryId: publicId 
        });
        
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        // If there was an upload file and an error occurred, clean up
        if (req.file && req.file.path) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (unlinkError) {
                console.error('Error removing temporary file:', unlinkError);
            }
        }
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        // Find the current product first
        const currentProduct = await Product.findById(req.params.id);
        
        if (!currentProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        
        // Extract data from request
        const { name, description, price, category, stock } = req.body;
        const updateData = { 
            name: name || currentProduct.name, 
            description: description || currentProduct.description, 
            price: price || currentProduct.price, 
            category: category || currentProduct.category,
            stock: stock || currentProduct.stock
        };

        // Check if there's a new file uploaded
        if (req.file) {
            try {
                // Make sure the file exists first
                if (fs.existsSync(req.file.path)) {
                    // Upload new image to cloudinary
                    const result = await cloudinary.uploader.upload(req.file.path, {
                        folder: "products",
                        width: 800,
                        crop: "scale"
                    });
                    
                    updateData.imageUrl = result.secure_url;
                    updateData.cloudinaryId = result.public_id;
                    
                    // Remove the temporary file after successful upload
                    try {
                        fs.unlinkSync(req.file.path);
                    } catch (unlinkError) {
                        console.error('Error removing temporary file:', unlinkError);
                        // Continue even if file deletion fails
                    }
                    
                    // If the product already had an image, delete it from cloudinary
                    if (currentProduct.cloudinaryId) {
                        await cloudinary.uploader.destroy(currentProduct.cloudinaryId);
                    }
                } else {
                    console.error('File does not exist:', req.file.path);
                }
            } catch (uploadError) {
                console.error('Upload error:', uploadError);
                return res.status(500).json({ 
                    success: false, 
                    message: "Image upload failed", 
                    error: uploadError.message 
                });
            }
        }

        // Update the product in database
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, message: "Product updated successfully", data: product });
    } catch (error) {
        // If there was an upload file and an error occurred, clean up
        if (req.file && req.file.path && fs.existsSync(req.file.path)) {
            try {
                fs.unlinkSync(req.file.path);
            } catch (unlinkError) {
                console.error('Error removing temporary file:', unlinkError);
            }
        }
        console.error('Update product error:', error);
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        
        // If product has an image, delete it from Cloudinary
        if (product.cloudinaryId) {
            await cloudinary.uploader.destroy(product.cloudinaryId);
        }
        
        // Delete product from database
        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export const getProductByCategory = async (req, res, next) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

export const getProductByName = async (req, res, next) => {
    try {
        const { name } = req.params;

        if (!name) {
            return res.status(400).json({ success: false, message: "Product name is required" });
        }

        const products = await Product.find({
            name: { $regex: new RegExp(`^${name}`, "i") } 
        });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        next(error);
    }
};

export const getProductByPrice = async (req, res, next) => {
    try {
        const products = await Product.find({ price: { $lte: req.params.price } });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};