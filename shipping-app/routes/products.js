var express = require('express');
var router = express.Router();
var _product = require('../models/Product');

// get
router.get('/', function(req, res, next) {
    _product.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

// get:id
router.get('/:id', function(req, res, next) {
    _product.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.json(product);
  });
});

// post
router.post('/', function(req, res, next) {
    _product.create(req.body, function (err, product) {
    if (err) return next(err);
    res.json(product);
  });
});

// put:id
router.put('/:id', function(req, res, next) {
    _product.findByIdAndUpdate(req.params.id, req.body, function (err, product) {
    if (err) return next(err);
    res.json(product);
  });
});

// delete:id
router.delete('/:id', function(req, res, next) {
    _product.findByIdAndRemove(req.params.id, req.body, function (err, product) {
    if (err) return next(err);
    res.json(product);
  });
});

module.exports = router;