//router/index.js
var express = require('express');
var router = express.Router();
var address = require('../modules/address/handle');
var banner = require('../modules/banner/handle');
var log = require('../modules/log/handle');
var order = require('../modules/order/handle');
var product = require('../modules/product/handle');
var shopcar = require('../modules/shopcar/handle');


router.post('/address/add', function (req, res, next) {
    address.add(req, res, next);
});
router.get('/address/queryList', function (req, res, next) {
    address.queryAll(req, res, next);
});
router.get('/address/queryById', function (req, res, next) {
    address.queryById(req, res, next);
});
router.get('/address/delete', function (req, res, next) {
    address.delete(req, res, next);
});
router.post('/address/update', function (req, res, next) {
    address.update(req, res, next);
});

router.post('/banner/add', function (req, res, next) {
    banner.add(req, res, next);
});
router.get('/banner/queryList', function (req, res, next) {
    banner.queryAll(req, res, next);
});
router.get('/banner/queryById', function (req, res, next) {
    banner.queryById(req, res, next);
});
router.get('/banner/delete', function (req, res, next) {
    banner.delete(req, res, next);
});
router.post('/banner/update', function (req, res, next) {
    banner.update(req, res, next);
});

router.post('/log/add', function (req, res, next) {
    log.add(req, res, next);
});
router.get('/log/queryList', function (req, res, next) {
    log.queryAll(req, res, next);
});
router.get('/log/queryById', function (req, res, next) {
    log.queryById(req, res, next);
});
router.get('/log/delete', function (req, res, next) {
    log.delete(req, res, next);
});
router.post('/log/update', function (req, res, next) {
    log.update(req, res, next);
});

router.post('/order/add', function (req, res, next) {
    order.add(req, res, next);
});
router.get('/order/queryList', function (req, res, next) {
    order.queryAll(req, res, next);
});
router.get('/order/queryById', function (req, res, next) {
    order.queryById(req, res, next);
});
router.get('/order/delete', function (req, res, next) {
    order.delete(req, res, next);
});
router.post('/order/update', function (req, res, next) {
    order.update(req, res, next);
});

router.post('/product/add', function (req, res, next) {
    product.add(req, res, next);
});
router.get('/product/queryList', function (req, res, next) {
    product.queryAll(req, res, next);
});
router.get('/product/queryById', function (req, res, next) {
    product.queryById(req, res, next);
});
router.get('/product/delete', function (req, res, next) {
    product.delete(req, res, next);
});
router.post('/product/update', function (req, res, next) {
    product.update(req, res, next);
});

router.post('/shopcar/add', function (req, res, next) {
    shopcar.add(req, res, next);
});
router.get('/shopcar/queryList', function (req, res, next) {
    shopcar.queryAll(req, res, next);
});
router.get('/shopcar/queryById', function (req, res, next) {
    shopcar.queryById(req, res, next);
});
router.get('/shopcar/delete', function (req, res, next) {
    shopcar.delete(req, res, next);
});
router.post('/shopcar/update', function (req, res, next) {
    shopcar.update(req, res, next);
});
module.exports = router;