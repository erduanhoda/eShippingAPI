var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our product model for our unit testing.
var _product = require('../models/Product');

describe("Get all products", function(){
    // Test will pass if we get all products
   it("should return all products", function(done){
       var productMock = sinon.mock(_product);
       var expectedResult = {status: true, products: []};
       productMock.expects('find').yields(null, expectedResult);
       _product.find(function (err, result) {
        productMock.verify();
        productMock.restore();
           expect(result.status).to.be.true;
           done();
       });
   });

   // Test will pass if we fail to get a product
   it("should return error", function(done){
       var productMock = sinon.mock(_product);
       var expectedResult = {status: false, error: "Something went wrong"};
       productMock.expects('find').yields(expectedResult, null);
       _product.find(function (err, result) {
        productMock.verify();
        productMock.restore();
           expect(err.status).to.not.be.true;
           done();
       });
   });
});

// Test will pass if the product is saved
describe("Post a new product", function(){
    it("should create new product", function(done){
        var productMock = sinon.mock(new _product(
            { name: 'Bike', desc: 'new bike', price: 500 }));
        var product = productMock.object;
        var expectedResult = { status: true };
        productMock.expects('save').yields(null, expectedResult);
        product.save(function (err, result) {
            productMock.verify();
            productMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the product is not saved
    it("should return error, if product not saved", function(done){
        var productMock = sinon.mock(new _product({ name: 'Bike', desc: 'new bike', price: 500 }));
        var product = productMock.object;
        var expectedResult = { status: false };
        productMock.expects('save').yields(expectedResult, null);
        product.save(function (err, result) {
            productMock.verify();
            productMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

// Test will pass if the product is updated based on an ID
describe('Update a product', function () {
    it('Should update the product with new value', function (done) {
        var productMock = sinon.mock(new _product({ name: 'Updated name'}));
        var product = productMock.object;
        productMock.expects('save').withArgs({_id: 12345}).yields(null, 'UPDATED');
        product.save({_id: 12345}, function(err, result){
            productMock.verify();
            productMock.restore();
            done();
        })
    });
});

// Test will pass if the product is deleted based on an ID
describe("Delete a product by id", function(){
    it("should delete a product by id", function(done){
        var productMock = sinon.mock(_product);
        var expectedResult = { status: true };
        productMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);
        _product.remove({_id: 12345}, function (err, result) {
            productMock.verify();
            productMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the product is not deleted based on an ID
    it("should return error if delete action is failed", function(done){
        var productMock = sinon.mock(_product);
        var expectedResult = { status: false };
        productMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);
        _product.remove({_id: 12345}, function (err, result) {
            productMock.verify();
            productMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});