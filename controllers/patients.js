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
        res.render('patients.ejs', { list: result });
    });
});

// GET route for displaying the form to add a patient
router.get('/add_patients', function(req, res) {
    db.getAllpatient(function(err, result) {
        res.render('add_patients.ejs', { list: result });
    });
});

// POST route for adding a patient with file upload
router.post('/add_patients', upload.single('image'), function(req, res) {
    if (!req.file) {
        console.log('No file received');
        return res.status(400).send('No files were uploaded.');
    }
    
    console.log(req.file); // Check the uploaded file details

    db.add_patient(req.body.first_name, req.body.last_name, req.body.passwordnum, req.body.dob, req.body.gender, req.body.address, req.body.phone, req.file.filename, req.body.fname);
    
    console.log('1 patient inserted');
    res.redirect('/patients');
});

// GET route for editing a patient
router.get('/edit_patient/:id', function(req, res) {
    var id = req.params.id;
    db.getpatientbyId(id, function(err, result) {
        res.render('edit_patient.ejs', { list: result });
    });
});

// POST route for editing a patient
router.post('/edit_patient/:id', function(req, res) {
    var id = req.params.id;
    db.editpatient(id, req.body.first_name, req.body.last_name, req.body.passwordnum, req.body.dob, req.body.gender, req.body.address, req.body.phone, req.body.image, req.body.fname, function(err, result) {
        if (err) throw err;
        res.redirect('/patients');
    });
});

// GET route for deleting a patient
router.get('/delete_patient/:id', function(req, res) {
    var id = req.params.id;
    db.getpatientbyId(id, function(err, result) {
        res.render('delete_patient.ejs', { list: result });
    });
});

// POST route for deleting a patient
router.post('/delete_patient/:id', function(req, res) {
    var id = req.params.id;
    db.deletepatient(id, function(err, result) {
        res.redirect('/patients');
    });
});

// POST route for searching a patient
router.post('/search', function(req, res) {
    var key = req.body.search;
    db.searchpatient(key, function(err, result) {
        console.log(result);
        res.render('patients.ejs', { list: result });
    });
});

module.exports = router;