import Product from "../models/product.model.js";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../config/env.js";
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

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
        const { name, description, price, category } = req.body;
        let image = req.body.image;

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            image = result.secure_url;
        }

        const product = await Product.create({ name, description, price, category, image });
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { name, description, price, category } = req.body;
        let image = req.body.image;

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            image = result.secure_url;
        }

        const updatedFields = { name, description, price, category, image };

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product updated successfully", data: product });

    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

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
        const products = await Product.find({ name: { $regex: req.params.name, $options: "i" } });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

export const getProductByPrice = async (req, res, next) => {
    try {
        const products = await Product.find({ price: req.params.price });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};
