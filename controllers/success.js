var express = require('express');
var router = express.Router();

router.get('*', function(req, res, next){
    if (req.cookies['username'] == null) {
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/', function(req, res) {
    res.render('success.ejs', { list: {} })
});

module.exports = router;
