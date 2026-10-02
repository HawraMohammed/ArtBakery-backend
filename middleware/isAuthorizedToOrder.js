const Order = require("../models/order")

const isAuthorizedToOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json("order not found");
        }
        if (order.user.toString() !== req.user._id.toString() || req.user.role !== 'admin') {
            return res.status(403).json("you are not authorized to view or modify this order");
        }
        next();
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}
module.exports = isAuthorizedToOrder 