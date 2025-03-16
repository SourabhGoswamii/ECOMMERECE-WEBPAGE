import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
                min: 1,
                default:1
            }
        }
    ]
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;