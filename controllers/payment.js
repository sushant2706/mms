var express = require('express');
var router = express.Router();
var db = require.main.require('./models/db_controller');
const stripe = require("stripe")('sk_test_51PIAZvJCCgy7mgCQb8l4nNT3EVt0gGIs5lipHeLm2O2ZWlxFeqelqt94VtE5ihBS20M5lhBhJF90cc9AypQYIrEE003XjA13x3')


router.get('*', function(req, res, next){
    if (req.cookies['username'] == null) {
        res.redirect('/login');
    } else {
        next();
    }
});

router.get('/', function(req, res) {
    db.getAllpatient(function(err, result) {
        if (err) throw err;
        console.log(result,)
        res.render('payment.ejs', { list: result });
    });
});

router.post('/:id',async function (req, res) {
    var id = req.params.id;
    var _id = req.body.id;
    console.log(_id,req.body,"_id")
    const product = await stripe.products.create({name:"Vest"});
    if(product){
        var price = await stripe.prices.create({product: product.id, unit_amount: 1000, currency: 'usd'});
    }
    if(price){
        var session = await stripe.checkout.sessions.create({
            line_items:[{price:price.id,quantity:1}],mode:"payment",success_url:"http://localhost:3000/success",cancel_url:"http://localhost:3000/cancel",customer_email:"example@example.com"
        })
    }
    db.editpayment(id, function(err, result) {
        if (err) throw err;
        // res.redirect('/patients');
        console.log(result,"payment result")
    });

    res.json(session)
});

module.exports = router;