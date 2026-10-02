const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    requestor: {
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
        enum: ['Birthday', 'Baby', 'Graduation', 'Weddiing', 'Gift', 'Corporate', 'Religious', 'Other']
        , required: true
    },
    requestedDate: { type: Date, required: true }
}, {
    timestamps: { createdAt: true }
})

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;