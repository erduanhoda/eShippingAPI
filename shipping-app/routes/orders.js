var express = require('express');
var router = express.Router();
var _order = require('../models/Order');

// get

router.get('/', function(req, res, next) {
    _order.find(function (err, orders) {
    if (err) return next(err);
    res.status(200).json(orders);
  });
});

// get:id
router.get('/:id', function(req, res, next) {
    _order.findById(req.params.id, function (err, order) {
    if (err) return next(err);
    res.status(200).json(order);
  });
});

// get: /address/:customer_address
router.get('/address/:customer_address', function(req, res, next) {
    _order.find({'customer_address':req.params.customer_address}, function (err, orders) {
    if (err) return next(err);
    res.status(200).json(orders);
  });
});

// get: customer/customer_name
router.get('/customer/:customer_name', function(req, res, next) {
    _order.find({'customer_name':req.params.customer_name}, function (err, orders) {
    if (err) return next(err);
    res.status(200).json(orders);
  });
});

// post
router.post('/', function(req, res, next) {
    _order.create(req.body, function (err, order) {
    if (err) return next(err);
    res.status(201).json(order);
  });
});

// put:id
router.put('/:id', function(req, res, next) {
    _order.findByIdAndUpdate(req.params.id, req.body, function (err, order) {
    if (err) return next(err);
    res.status(200).json(order);
  });
});

// delete:id
router.delete('/:id', function(req, res, next) {
    _order.findByIdAndRemove(req.params.id, req.body, function (err, order) {
    if (err) return next(err);
    res.status(200).json(order);
  });
});

module.exports = router;