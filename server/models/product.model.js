import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"],
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    // Change this from 'images' to 'imageUrl' for consistency
    imageUrl: {
        type: String,
    },
    // Add cloudinaryId for reference when deleting or updating images
    cloudinaryId: {
        type: String,
    },
    
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

export default Product;