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

// GET route for displaying all doctors
router.get('/', function(req, res) {
    db.getAllDoc(function(err, result) {
        if (err) throw err;
        res.render('doctors.ejs', { list: result });
    });
});

// GET route for displaying the form to add a doctor
router.get('/add_doctor', function(req, res) {
    db.getalldept(function(err, result) {
        res.render('add_doctor.ejs', { list: result });
    });
});

// POST route for adding a doctor with file upload
router.post('/add_doctor', upload.single('image'), function(req, res) {
    if (!req.file) {
        console.log('No file received');
        return res.status(400).send('No files were uploaded.');
    }
    
    console.log(req.file); // Check the uploaded file details

    db.add_doctor(req.body.first_name, req.body.last_name, req.body.email, req.body.dob, req.body.gender, req.body.address, req.body.phone, req.file.filename, req.body.department, req.body.biography);
    
    console.log('1 doctor inserted');
    res.redirect('/doctors');
});

// GET route for editing a doctor
router.get('/edit_doctor/:id', function(req, res) {
    var id = req.params.id;
    db.getDocbyId(id, function(err, result) {
        res.render('edit_doctor.ejs', { list: result });
    });
});

// POST route for editing a doctor
router.post('/edit_doctor/:id', function(req, res) {
    var id = req.params.id;
    db.editDoc(id, req.body.first_name, req.body.last_name, req.body.email, req.body.dob, req.body.gender, req.body.address, req.body.phone, req.body.image, req.body.department, req.body.biography, function(err, result) {
        if (err) throw err;
        res.redirect('back');
    });
});

// GET route for deleting a doctor
router.get('/delete_doctor/:id', function(req, res) {
    var id = req.params.id;
    db.getDocbyId(id, function(err, result) {
        res.render('delete_doctor.ejs', { list: result });
    });
});

// POST route for deleting a doctor
router.post('/delete_doctor/:id', function(req, res) {
    var id = req.params.id;
    db.deleteDoc(id, function(err, result) {
        res.redirect('/doctors');
    });
});

// POST route for searching a doctor
router.post('/search', function(req, res) {
    var key = req.body.search;
    db.searchDoc(key, function(err, result) {
        console.log(result);
        res.render('doctors.ejs', { list: result });
    });
});

module.exports = router;
