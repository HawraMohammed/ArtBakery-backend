const Order = require("../models/order")

const getAllOrders = async (req, res) => {
    try {
        let query;

        if (req.query.calendar) {
            const { startDate, endDate } = req.query;

            query = {
                requestedDate: {
                    $gte: new Date(startDate),
                    $lt: new Date(endDate)
                }
            };
        }

        else if (req.user.role === "admin") {
            query = {
                $or: [
                    { requestedDate: { $gt: new Date() } },
                    { paymentStatus: "unpaid" }
                ]
            };
        }

        else {
            query = {
                user: req.user._id
            };
        }

        const orders = await Order.find(query)
            .populate('user')
            .sort({ createdAt: 1, requestedDate: 1 })

        res.status(200).json(orders);
    }
    catch (err) { res.status(500).json(err.message) }
}

const getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId)
            .populate('user')

        res.status(200).json(order);
    }
    catch (err) { res.status(500).json(err.message) }
}

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.orderId)

        res.status(200).json(order);
    }
    catch (err) { res.status(500).json(err.message) }
}

const updatePaymentInfo = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json("order not found")
        }

        order.price = req.body.price;
        order.paymentStatus = req.body.paymentStatus;

        await order.save()
        await order.populate('user')

        res.status(200).json(order);
    }
    catch (err) { res.status(500).json(err.message) }
}
const addressInfo = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json("order not found")
        }
        if (order.user.toString() !== req.user._id.toString()) {
            return res.status(403).json("you are not authorized to view or modify this order");
        }
        order.address = req.body.address;

        await order.save()
        await order.populate('user')

        res.status(200).json(order);
    }
    catch (err) { res.status(500).json(err.message) }
}
module.exports = { getAllOrders, getSingleOrder, deleteOrder, updatePaymentInfo, addressInfo }