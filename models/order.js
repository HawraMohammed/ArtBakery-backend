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
        enum: ['Birthday', 'Baby', 'Graduation', 'Weddiing', 'Gift', 'Corporate', 'Religious', 'Seasonal', 'Other']
        , required: true
    },
    requestedDate: { type: Date, required: true },
    price: { type: Number, required: true },
    paymentStatus: {
        type: String,
        enum: ['unpaid', 'paid'],
        required: true,
        defualt: 'unpaid'
    }
}, {
    timestamps: { createdAt: true }
})


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;