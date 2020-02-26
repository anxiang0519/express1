//router/index.js
var express = require('express');
var router = express.Router();
var user = require('../modules/handle');
/* GET users listing. */
router.get('/', function(req, res, next) {
  user.queryAll(req, res, next);
});
router.get('/addUser', function(req, res, next) {
    user.add(req, res, next);
});
router.get('/queryAll', function(req, res, next) {
  user.queryAll(req, res, next);
});

router.get('/editUser', function(req, res, next) {
    user.queryById(req, res, next);
});
router.get('/deleteUser', function(req, res, next) {
    user.delete(req, res, next);
});
// router.get('/update', function(req, res, next) {
//     res.render('update');
// });
router.post('/updateUser', function(req, res, next) {
    user.update(req, res, next);
});
router.post('/login', function(req, res, next) {
    user.login(req, res, next);
});
router.post('/register', function(req, res, next) {
    user.register(req, res, next);
});
module.exports = router;