const express = require('express');
const orderCtrl = require('../controllers/orderCtrl');
const isAuthorizedToOrder = require('../middleware/isAuthorizedToOrder');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router({ mergeParams: true })

router.get('/', orderCtrl.getAllOrders);
router.get('/:orderId', isAuthorizedToOrder, orderCtrl.getSingleOrder);
router.delete('/:orderId', isAuthorizedToOrder, orderCtrl.deleteOrder);
router.patch('/:orderId', isAdmin, orderCtrl.updatePaymentInfo);

module.exports = router;