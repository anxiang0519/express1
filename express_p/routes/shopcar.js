var express = require('express');
var router = express.Router();
var shopcar = require('../modules/shopcar/shopcarController');

router.post('/add', function (req, res, next) {
    shopcar.add(req, res, next);
});
router.get('/queryAll', function (req, res, next) {
    shopcar.queryAll(req, res, next);
});
router.get('/wxqueryAll', function (req, res, next) {
    shopcar.wxqueryAll(req, res, next);
});
router.get('/queryById', function (req, res, next) {
    shopcar.queryById(req, res, next);
});
router.get('/delete', function (req, res, next) {
    shopcar.delete(req, res, next);
});
router.post('/update', function (req, res, next) {
    shopcar.update(req, res, next);
});

module.exports = router;