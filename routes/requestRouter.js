const express = require('express');
const requestCtrl = require('../controllers/requestCtrl');
const isAuthorizedRoReq = require('../middleware/isAuthorizedToReq');

const router = express.Router({ mergeParams: true })

router.post('/', requestCtrl.createRequest);
router.get('/', requestCtrl.getAllRequest);
router.get('/requestId', isAuthorizedRoReq, requestCtrl.show);
router.put('/requestId', requestCtrl.updateRequest);
router.delete('/requestId', isAuthorizedRoReq, requestCtrl.deleteRequest);

module.exports = router;