const Request = require("../models/request");

const isAuthorizedToReq = async (req, res, next) => {
    const request = await Request.findById(req.params.requestId);

    if (!request) {
        return res.status(404).json('request not found!!');
    }
    if (request.requestor.toString() !== req.user._id.toString() || req.user.role != - 'admin')
        return res.status(403).json('you are not authorized to manage the request');

    next();
}
module.exports = { isAuthorizedToReq }