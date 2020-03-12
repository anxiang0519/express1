var express = require('express');
var router = express.Router();
var user = require('../modules/user/userController');

router.post('/add', function (req, res, next) {
    user.add(req, res, next);
});
router.get('/queryAll', function (req, res, next) {
    user.queryAll(req, res, next);
});
router.get('/queryById', function (req, res, next) {
    user.queryById(req, res, next);
});
router.get('/delete', function (req, res, next) {
    user.delete(req, res, next);
});
router.post('/update', function (req, res, next) {
    user.update(req, res, next);
});
router.post('/login', function (req, res, next) {
    user.login(req, res, next);
});
module.exports = router;