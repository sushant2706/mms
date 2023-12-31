var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');
var multer = require('multer');
var fs = require('fs');
var path = require('path');

router.get('*', function (res, req, next) {
    if (req.cookies['username'] == null) {
        res.redirect('/login');
    } else {
        next();
    }
})

var storage = multer.diskStorage({
    destination: function (req, res, file, cb) {
        cb(null, "public/assets/images/upload_images");
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

router.get('/', function (req, res) {
    if (err)
        throw err;
    res.render('doctors.ejs', { list: result })
})

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/add_doctor', function (req, res) {
    db.getalldept(function (err, result) {
        res.render('add_doctor.ejs', { list: result })
    })
});

router.post('/add_doctor',upload.single("image"), function (req, res) {
    db.add_doctor(req.body.first_name, req.body.last_name, req.body.email, req.body.dob, req.body.gender, req.body.address, req.body.phone, req.file.filename, req.body.department, req.body.biography)
    if (db.add_doctor) {
        console.log('1 doctor inserted')
    }
    res.render('add_doctor');
});

router.get('/edit_doctor/:id', function (req, res) {
    var id = req.params.id;
    db.getDocById(id, function (err, result) {
        res.render('edit_doctor.ejs', { list: result })
    })
});

router.post('/edit_doctor/:id', function (req, res) {
    var id = req.params.id;
    db.editDoc(req.body.first_name, req.body.last_name, req.body.email, req.body.dob, req.body.gender, req.body.address, req.body.phone, req.body.department, req.body.biography,
        function (err, result) {
            if (err) throw err;
            res.redirect('back');
        }
    )
});

router.get('/delete_doctor/:id', function (req, res) {
    var id = req.params.id;
    db.getDocById(id, function (err, result) {
        res.render('delete_doctor.ejs', { list: result })
    })
});

router.post('/delete_doctor/:id', function (req, res) {
    var id = req.params.id;
    db.getDocById(id, function (err, result) {
        res.redirect('doctor')
    })
});

router.get('/', function (req, res) {
    db.getAllDoc(function (err, result) {
        if (err)
            throw err;
        res.render('doctor.ejs', { list: result })
    })
});

router.post('/search', function (req, res) {
    var key = req.body.search;
    db.searchDoc(key, function (err, result) {
        console.log(result);
        res.render('doctor.ejs', { list: result })
    })
});

module.exports = router;