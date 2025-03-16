import orders from "../models/orders.model.js";

export const getAllOrders = async (req, res, next) => {
    try {
        const allOrders = await orders.find();
        res.status(200).json({ success: true, data: allOrders });
        console.log(allOrders);
    } catch (error) {
        next(error);
    }
};

export const getOrderById = async (req, res, next) => {
    try {
        const order = await orders.findById(req.params.id);

        if (!order) {
            const error = new Error("Order not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        next(error);
    }
};

export const createOrder = async (req, res, next) => {
    try {
        console.log(req.body);
        const { user, products, totalAmount, status,shippingAddress,username } = req.body; 
        console.log(products);
        const order = await orders.create({ user, products, totalAmount, status,shippingAddress,username });
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        next(error);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        const {  status } = req.body; //here products is an array of objects with product and quantity

        const updatedFields = {  status };

        const order = await orders.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, message: "Order updated successfully", data: order });

    } catch (error) {
        next(error);
    }
};

export const cancelOrder = async (req, res, next) => {
    try {
        const order = await orders.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, message: "Order cancelled successfully" });

    } catch (error) {
        next(error);
    }
};

export const getOrdersByUserId = async (req, res, next) => {
    try {
        const userOrders = await orders.find({ user: req.params.id });

        if (!userOrders) {
            const error = new Error("Orders not found for this user");
            error.status = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: userOrders });
    } catch (error) {
        next(error);
    }
};