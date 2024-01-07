var express = require('express');
var router = express.Router();
var home = require('./home');
var bodyParser = require('body-parser');
var db = require.main.require('./models/db_controller');
var mysql = require('mysql');
var session = require('express-session');
const { check, validationResult } = require('express-validator');

router.get('/', function(req ,res){

    res.render('login.ejs');
});


var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'fyp',
});

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/', [check('username').notEmpty().withMessage("Username is required"),
check('password').notEmpty().withMessage("Password is required")
], function (request, response) {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() })
    }
    var username = request.body.username;
    var password = request.body.password;
    console.log(username, password, "Here") 
    if (username && password) {
        con.query('select * from users where username = ? and password = ?', [username, password],
            function (error, results, fields) {
                console.log(results,"results")
                if (results.length > 0) {
                    // response.status(200).json({
                    //     status:true,
                    //     message: `Logged in successfully as ${username}`,
                    // })
                    request.session.loggedin = true ; 
                    request.session.username = username;
                    response.cookie('username' , username);
                    console.log("redirecting to home")
                    response.redirect('/home');
                } else {
                    response.send("Wrong Username or Password");
                }
                response.end();
            })
    } else {
        response.send("Please Enter your Username and Password");
        response.end();
    }
})

module.exports = router;