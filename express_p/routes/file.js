var express = require('express');
var router = express.Router();
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
router.post('/upload', upload.single('file'), function (req, res, next) {
    let file = req.file;
    res.json({ message: "ok", file: file });
});

router.get('/loadimg/e461d29d6cc9bae1056c01434980db46', function (req, res, next) {
    console.log(req);
    // let file = path.join(__dirname,'../../../uploads/' + '97d53267175a75dd758a84329950fe25');
    // console.log(file);
    // res.download(file); 
});

module.exports = router