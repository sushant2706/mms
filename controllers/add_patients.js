var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require ('./models/db_controller');
var fileUpload = require('express-fileupload');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function (req, res) {
    res.render('add_patients.ejs');
});

router.post('/', function (req, res) {
    console.log(req.body);
    if (!req.files) {
        console.log('no file uploaded');
    }

    var file = req.body.image;
    var image = file.name;

    file.mv('/public/assets/images/upload_images' + file.name, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        db.add_patient(req.body.first_name, req.body.last_name, req.body.passwordnum, req.body.dob, req.body.gender, req.body.address, req.body.phone, req.body.image, req.body.fname);

        // Assuming db.add_doctor returns a promise or executes a callback
        // You may need to handle its success or failure accordingly

        console.log('1 patient inserted');
        res.redirect('add_patients');
    });
});

module.exports = router;
