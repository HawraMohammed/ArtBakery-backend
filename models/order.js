const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Birthday', 'Baby', 'Graduation', 'Wedding', 'Gift', 'Corporate', 'Religious', 'Seasonal', 'Other']
        , required: true
    },
    address: {
        building: {
            type: String
        },
        block: {
            type: String
        },
        road: {
            type: String
        },
        area: {
            type: String
        }
    },
    requestedDate: { type: Date, required: true },
    price: { type: Number },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid'],
        required: true,
        default: 'unpaid'
    },
    paymentId: {
        type: String
    },

    paymentDate: {
        type: Date
    },
}, {
    timestamps: { createdAt: true }
})


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;