const express = require('express');
const requestCtrl = require('../controllers/requestCtrl');
const isAuthorizedToReq = require('../middleware/isAuthorizedToReq');
const isAvailableSlot = require('../middleware/isAvailableSlots');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router({ mergeParams: true })

router.post('/', isAvailableSlot, requestCtrl.createRequest);
router.get('/', requestCtrl.getAllRequest);
router.get('/:requestId', isAuthorizedToReq, requestCtrl.show);
router.put('/:requestId', requestCtrl.updateRequest);
router.post('/:requestId/accept', isAdmin, isAvailableSlot, requestCtrl.acceptRequest);
router.delete('/:requestId', isAuthorizedToReq, requestCtrl.withdrawRequest);


module.exports = router;