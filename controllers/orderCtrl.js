const { default: axios } = require("axios");
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
const tapPayment = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('user');

        if (!order) {
            return res.status(404).json("order not found")
        }

        if (order.paymentStatus === "paid") {
            return res.status(400).json("Order is already paid");
        }
        const response = await axios.post(
            "https://api.tap.company/v2/charges",
            {
                amount: order.price,
                currency: "BHD",

                source: {
                    id: "src_all"
                },

                customer: {
                    first_name: order.user.username,
                    phone: {
                        country_code: "973",
                        number: order.user.phone
                    }
                },

                redirect: {
                    url: `http://localhost:5173/orders?orderId=${order._id}`
                },

                description: `ArtBakery Order ${order._id}`
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.TAP_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const charge = response.data;

        order.paymentId = charge.id;
        await order.save();

        res.json({
            paymentUrl: charge.transaction.url
        });

    }
    catch (err) {
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        console.log("MESSAGE:", err.message);
        res.status(500).json(err.message)
    }
}

const checkPayment = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json("Order not found");
        }
        const tapId = req.query.tap_id;

        const response = await axios.get(
            `https://api.tap.company/v2/charges/${tapId}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.TAP_SECRET_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const charge = response.data;

        if (charge.status === "CAPTURED") {
            order.paymentStatus = "paid";
            await order.save();
        }
        await order.populate('user')
        res.json(order);

    } catch (err) {
        res.status(500).json(err.message);
    }
};
module.exports = { getAllOrders, getSingleOrder, deleteOrder, updatePaymentInfo, addressInfo, tapPayment, checkPayment }