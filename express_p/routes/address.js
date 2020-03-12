var express = require('express');
var router = express.Router();
var address = require('../modules/address/addressController');

router.post('/add', function (req, res, next) {
    address.add(req, res, next);
});
router.get('/queryAll', function (req, res, next) {
    address.queryAll(req, res, next);
});
router.get('/queryById', function (req, res, next) {
    address.queryById(req, res, next);
});
router.get('/delete', function (req, res, next) {
    address.delete(req, res, next);
});
router.post('/update', function (req, res, next) {
    address.update(req, res, next);
});

module.exports = router;