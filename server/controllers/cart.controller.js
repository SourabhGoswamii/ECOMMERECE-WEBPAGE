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
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = new Cart({ user: req.user.id, products: [] });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(201).json({ success: true, data: cart });
    } catch (error) {
        next(error);
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
        res.status(200).json({ success: true, data: cart });
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
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            return res.status(200).json({ success: true, data: cart });
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