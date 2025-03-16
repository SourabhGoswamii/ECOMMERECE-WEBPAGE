import Cart from "../models/cart.models.js";

export const getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('products.product');
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }
        res.status(200).json({ success: true, data: cart });
    } catch (error) {
        next(error);
    }
};

export const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity, user } = req.body;

        if (!productId || !quantity || !user) {
            return res.status(400).json({ success: false, message: "Product ID, quantity, and user ID are required" });
        }

        let cart = await Cart.findOne({ user: user });
        if (!cart) {
            cart = await Cart.create({ user: user, products: [] });
        }
        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }
        await cart.save();
        res.status(201).json({ success: true, data: cart });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};
export const removeFromCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }
        cart.products = cart.products.filter(p => p.product.toString() !== req.params.id);
        await cart.save();
        res.status(200).json({ success: true, message: "Product removed from cart", data: cart.products });
    } catch (error) {
        next(error);
    }
};

export const updateCart = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.id);

        if (productIndex > -1) {
            cart.products[productIndex].quantity = Math.max(1, quantity);
            await cart.save();
            return res.status(200).json({ success: true, message: "Cart updated successfully", data: cart.products });
        } else {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }
    } catch (error) {
        next(error);
    }
};


export const checkout = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }
        await Cart.deleteOne({ user: req.user.id });
        cart.products = [];
        await cart.save();

        res.status(200).json({ success: true, message: "Checkout successful" });
    } catch (error) {
        next(error);
    }
};