var express = require('express');
var router = express.Router();
var log = require('../modules/log/logController');

router.post('/add', function (req, res, next) {
    log.add(req, res, next);
});
router.get('/queryAll', function (req, res, next) {
    log.queryAll(req, res, next);
});
router.get('/queryById', function (req, res, next) {
    log.queryById(req, res, next);
});
router.get('/delete', function (req, res, next) {
    log.delete(req, res, next);
});
router.post('/update', function (req, res, next) {
    log.update(req, res, next);
});

module.exports = router;