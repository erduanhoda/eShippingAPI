var express = require('express');
var router = express.Router();
var _customer = require('../models/Customer');
var _order = require('../models/Order');

// get
router.get('/', function(req, res, next) {
    _customer.find(function (err, customers) {
    if (err) return next(err);
    res.json(customers);
  });
});

router.get('/item/:item_name', function(req, res, next) {
    var item_name = req.params.item_name;
    _order.aggregate([
        { '$match': {'item_name': item_name }},
        { '$project': { 'customer_name': 1 } },
        { '$group': { '_id': '$customer_name' } }
    ], function(err, concats) {
        res.json(concats);
    });
    
});

router.get('/amount/:customer_name', function(req, res, next) {
    var customer_name = req.params.customer_name;
    _order.aggregate([
        { '$match': {'customer_name': customer_name }},
        {
            $group : {_id : "$customer_name", num_tutorial : { $sum : "$price"} }
        }
    ], function(err, concats) {
        res.json(concats);
    });
});

// get:id
router.get('/:id', function(req, res, next) {
    _customer.findById(req.params.id.trim(), function (err, customer) {
    if (err) return next(err);
    res.json(customer);
  });
});

// post
router.post('/', function(req, res, next) {
    req.body.is_deleted = false;
    _customer.create(req.body, function (err, customer) {
    if (err) return next(err);
    res.json(customer);
  });
});

// put:id
router.put('/:id', function(req, res, next) {
    _customer.findByIdAndUpdate(req.params.id, req.body, function (err, customer) {
    if (err) return next(err);
    res.json(customer);
  });
});

// delete:id
router.delete('/:id', function(req, res, next) {
    _customer.findByIdAndRemove(req.params.id, req.body, function (err, customer) {
    if (err) return next(err);
    res.json(customer);
  });
});

module.exports = router;