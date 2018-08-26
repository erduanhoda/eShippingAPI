var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our customer model for our unit testing.
var _customer = require('../models/Customer');

describe("Get all customers", function(){
    // Test will pass if we get all customers
   it("should return all customers", function(done){
       var customerMock = sinon.mock(_customer);
       var expectedResult = {status: true, customers: []};
       customerMock.expects('find').yields(null, expectedResult);
       _customer.find(function (err, result) {
        customerMock.verify();
        customerMock.restore();
           expect(result.status).to.be.true;
           done();
       });
   });

   // Test will pass if we fail to get a customer
   it("should return error", function(done){
       var customerMock = sinon.mock(_customer);
       var expectedResult = {status: false, error: "Something went wrong"};
       customerMock.expects('find').yields(expectedResult, null);
       _customer.find(function (err, result) {
        customerMock.verify();
        customerMock.restore();
           expect(err.status).to.not.be.true;
           done();
       });
   });
});

// Test will pass if the customer is saved
describe("Post a new customer", function(){
    it("should create new customer", function(done){
        var customerMock = sinon.mock(new _customer(
            { name: 'Nike', desc: 'nike store', price: 500 }));
        var customer = customerMock.object;
        var expectedResult = { status: true };
        customerMock.expects('save').yields(null, expectedResult);
        customer.save(function (err, result) {
            customerMock.verify();
            customerMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the customer is not saved
    it("should return error, if customer not saved", function(done){
        var customerMock = sinon.mock(new _customer({ name: 'Nike', desc: 'nike store', price: 500 }));
        var customer = customerMock.object;
        var expectedResult = { status: false };
        customerMock.expects('save').yields(expectedResult, null);
        customer.save(function (err, result) {
            customerMock.verify();
            customerMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

// Test will pass if the customer is updated based on an ID
describe('Update a customer', function () {
    it('Should update the customer with new value', function (done) {
        var customerMock = sinon.mock(new _customer({ name: 'Updated name'}));
        var customer = customerMock.object;
        customerMock.expects('save').withArgs({_id: 123}).yields(null, 'UPDATED');
        customer.save({_id: 123}, function(err, result){
            customerMock.verify();
            customerMock.restore();
            done();
        })
    });
});

// Test will pass if the customer is deleted based on an ID
describe("Delete a customer by id", function(){
    it("should delete a customer by id", function(done){
        var customerMock = sinon.mock(_customer);
        var expectedResult = { status: true };
        customerMock.expects('remove').withArgs({_id: 123}).yields(null, expectedResult);
        _customer.remove({_id: 123}, function (err, result) {
            customerMock.verify();
            customerMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the customer is not deleted based on an ID
    it("should return error if delete action is failed", function(done){
        var customerMock = sinon.mock(_customer);
        var expectedResult = { status: false };
        customerMock.expects('remove').withArgs({_id: 123}).yields(expectedResult, null);
        _customer.remove({_id: 123}, function (err, result) {
            customerMock.verify();
            customerMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});