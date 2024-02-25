var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var db = require.main.require('./models/db_controller');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Middleware for checking authentication
router.get('*', function(req, res, next){
    if (req.cookies['username'] == null) {
        res.redirect('/login');
    } else {
        next();
    }
});

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets/images/upload_images");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

// GET route for displaying all patient
router.get('/', function(req, res) {
    db.getAllpatient(function(err, result) {
        if (err) throw err;
        console.log('hello',result);
        res.render('report.ejs', { list: result });
    });
});

router.get('/templete/:id', function(req, res) {
    var id = req.params.id;
    db.getDocbyId(id, function(err, result) {
        res.render('templete.ejs', { list: result });
    });
});

// POST route for searching a patient
router.post('/search', function(req, res) {
    var key = req.body.search;
    db.searchpatient(key, function(err, result) {
        console.log(result);
        res.render('report.ejs', { list: result });
    });
});

module.exports = router;

