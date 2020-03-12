var express = require('express');
var router = express.Router();
var product = require('../modules/product/productController');

router.post('/add', function (req, res, next) {
    product.add(req, res, next);
});
router.get('/queryAll', function (req, res, next) {
    product.queryAll(req, res, next);
});
router.get('/queryById', function (req, res, next) {
    product.queryById(req, res, next);
});
router.get('/delete', function (req, res, next) {
    product.delete(req, res, next);
});
router.post('/update', function (req, res, next) {
    product.update(req, res, next);
});

module.exports = router;