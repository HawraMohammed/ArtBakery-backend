const Request = require("../models/request");

const createRequest = async (req, res) => {
    try {
        //check if the weekly orders are completed 
        const newRequest = await Request.create({ ...req.body, requestor: req.user._id });
        res.status(201).json(newRequest);
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}
const getAllRequest = async (req, res) => {
    try {
        const requests = await Request.find(req.user.role == 'admin' ? { requestedDate: { $gt: new Date() } } : { requestor: req.user._id })
            .populate('requestor')
            .sort({ createdAt: 1, requestedDate: 1 })

        res.status(200).json(requests)
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}
const show = async (req, res) => {
    try {
        const request = await Request.findById(req.params.requestId)
            .populate('requestor');

        if (!request) {
            return res.status(404).json('request not found!!');
        }

        res.status(200).json(request)
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}

const updateRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.requestId)
            .populate('requestor');

        if (!request) {
            return res.status(404).json('request not found!!');
        }
        if (request.requestor._id !== req.user._id)
            return res.status(403).json('you are not authorized to update the request');

        const updatedRequest = await Request.findByIdAndUpdate(req.params.requestId, req.body, { new: true })
            .populate('requestor')

        res.status(200).json(updatedRequest)
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}

const deleteRequest = async (req, res) => {
    try {
        if (req.params.action === "accept") {
            //create order

        }
        else {
            await Request.findByIdAndDelete(req.params.requestId);
        }

    }
    catch (err) {
        return res.status(500).json(err.message);
    }
}
module.exports = { createRequest, getAllRequest, show, updateRequest, deleteRequest }