import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    shippingAddress:{
        type: String,
        required: true,
        
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;