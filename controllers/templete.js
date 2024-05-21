var express = require ('express');
var router = express.Router();
var db = require.main.require ('./models/db_controller');
var bodyPaser = require ('body-parser');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/',function(req,res){
    res.render('templete.ejs',{patient : req});
});

router.get('/test/:id',function(req,res){
    console.log('hit', req.params.id);
    var id = req.params.id;
    db.getpatientbyId(id,function(err,result){
        var first_name = result[0].first_name;
        var last_name = result[0].last_name;
        var passwordnum = result[0].passwordnum;
        var dob = result[0].dob;
        var address = result[0].address;
        var phone = result[0].phone;
        var fname = result[0].fname;
        // Log the values for debugging
        console.log('Data for rendering template:', { first_name, last_name, passwordnum, dob, address, phone, fname });
        res.render('templete.ejs',{first_name:first_name, last_name:last_name, passwordnum:passwordnum, dob:dob, address:address, phone:phone, fname:fname});
    });

});

module.exports =router;