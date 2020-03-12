var express = require('express');
var router = express.Router();
var userinfo = require('../modules/userinfo/userinfoController');

router.post('/add', function (req, res, next) {
    userinfo.add(req, res, next);
});
router.get('/queryAll', function (req, res, next) {
    userinfo.queryAll(req, res, next);
});
router.get('/queryById', function (req, res, next) {
    userinfo.queryById(req, res, next);
});
router.get('/delete', function (req, res, next) {
    userinfo.delete(req, res, next);
});
router.post('/update', function (req, res, next) {
    userinfo.update(req, res, next);
});

module.exports = router;