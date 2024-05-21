var express = require ('express');
var session = require ('express-session');
var cookie = require ('cookie-parser');
var path = require ('path');
var ejs= require ('ejs');
var multer = require('multer');
var path = require ('path');
var async = require ('async');
var nodmailer = require ('nodemailer');
var crypto = require ('crypto');
var expressValidator = require ('express-validator');
var  sweetalert = require('sweetalert2');
var app = express();
var bodyParser = require ('body-parser');
var stripe = require ('stripe')



var  login = require ('./controllers/login');
var  home = require ('./controllers/home');
var  signup = require ('./controllers/signup');
var  doc_controller = require ('./controllers/doc_controller');
var db = require ('./models/db_controller');
var reset = require('./controllers/reset_controller');
var set = require('./controllers/set_controller');
var employee = require ('./controllers/employee.js');
var logout = require ('./controllers/logout');
var verify = require ('./controllers/verify');
var landing = require ('./controllers/landing');
var patients = require ('./controllers/patients.js');
var verification = require ('./controllers/verification.js');
var report = require ('./controllers/report');
var templete = require ('./controllers/templete');
var payment = require ('./controllers/payment');
var success = require ('./controllers/success');
var cancel = require ('./controllers/cancel');


var app = express();


app.set('view engine ', 'ejs');


app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookie());



var server =app.listen(3000 , function(){
    console.log('Server started');
});

app.use ('/login' ,login);
app.use ('/home' , home);
app.use ('/signup' , signup);
app.use ('/doctors', doc_controller);
app.use ('/resetpassword' ,reset);
app.use ('/setpassword',set);
app.use ('/employee',employee);
app.use ('/logout',logout);
app.use ('/verify', verify);
app.use ('/',signup);
app.use ('/patients', patients);
app.use ('/verification', verification);
app.use ('/report', report);
app.use ('/templete', templete);
app.use ('/payment', payment);
app.use ('/success', success);
app.use ('/cancel', cancel);
