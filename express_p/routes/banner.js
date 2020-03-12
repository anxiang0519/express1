var express = require('express');
var router = express.Router();
var banner = require('../modules/banner/bannerController');

router.post('/add', function (req, res, next) {
    banner.add(req, res, next);
});
router.get('/queryAll', function (req, res, next) {
    banner.queryAll(req, res, next);
});
router.get('/queryById', function (req, res, next) {
    banner.queryById(req, res, next);
});
router.get('/delete', function (req, res, next) {
    banner.delete(req, res, next);
});
router.post('/update', function (req, res, next) {
    banner.update(req, res, next);
});

module.exports = router;