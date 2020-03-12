var express = require('express');
var router = express.Router();
var order = require('../modules/order/orderController');

router.post('/add', function (req, res, next) {
    order.add(req, res, next);
});
router.get('/queryAll', function (req, res, next) {
    order.queryAll(req, res, next);
});
router.get('/queryById', function (req, res, next) {
    order.queryById(req, res, next);
});
router.get('/delete', function (req, res, next) {
    order.delete(req, res, next);
});
router.post('/update', function (req, res, next) {
    order.update(req, res, next);
});

module.exports = router;