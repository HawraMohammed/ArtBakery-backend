const Order = require("../models/order");
const getWeekRange = require("../utils/weekRange");

const isAvailableSlot = async (req, res, next) => {
    try {
        const { startOfWeek, endOfWeek } = getWeekRange(req.body.requestedDate);

        const orderCount = await Order.countDocuments({
            requestedDate: {
                $gte: startOfWeek,
                $lt: endOfWeek
            }
        });

        if (orderCount >= 2) {
            return res.status(400).json("No slots are available within this week for orders")
        }

        req.orderCount = orderCount;
        req.startOfWeek = startOfWeek;
        req.endOfWeek = endOfWeek;

        next();
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}
module.exports = isAvailableSlot