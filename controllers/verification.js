var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');
var fileUpload = require('express-fileupload');
router.use(fileUpload());
const { spawn } = require('child_process');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { reconstructFieldPath } = require('express-validator/src/field-selection');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function (req, res) {
    res.render('verification.ejs');
});

router.post('/adduser', (req, res) =>{
    let result;
    // spawn new child process to call the python script 
    // and pass the variable values to the python script
    const python = spawn('python', ['face/datacollect.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        result = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        console.log(result, 'result');
        res.send(result);
    });
})


router.post('/', function (req, res) {
    if (!req.files) {
        console.log('no file uploaded');
        return res.status(400).send('No file uploaded');
    }


    var image = req.files.image;
    var uploadFolder = 'face/final';
    var fixedFilename = 'finalphoto.jpg';
    var imagePath = path.join(uploadFolder, fixedFilename);


    image.mv(imagePath, function (err) {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    });

    let result;
    // spawn new child process to call the python script 
    // and pass the variable values to the python script
    const python = spawn('python', ['face/main.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        result = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        console.log(result, 'result');
        res.send(result);
    });
});


module.exports = router;