var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our order model for our unit testing.
var _order = require('../models/Order');

describe("Get all orders", function(){
    // Test will pass if we get all order
   it("should return all orders", function(done){
       var orderMock = sinon.mock(_order);
       var expectedResult = {status: true, orders: []};
       orderMock.expects('find').yields(null, expectedResult);
       _order.find(function (err, result) {
        orderMock.verify();
        orderMock.restore();
           expect(result.status).to.be.true;
           done();
       });
   });

   // Test will pass if we fail to get a order
   it("should return error", function(done){
       var orderMock = sinon.mock(_order);
       var expectedResult = {status: false, error: "Something went wrong"};
       orderMock.expects('find').yields(expectedResult, null);
       _order.find(function (err, result) {
        orderMock.verify();
        orderMock.restore();
           expect(err.status).to.not.be.true;
           done();
       });
   });
});

// Test will pass if the order is saved
describe("Post a new order", function(){
    it("should create new order", function(done){
        var orderMock = sinon.mock(new _order(
            {   
                customer_name: 'Nike',
                customer_address: 'SF, USA',
                item_name: 'Macbook Pro',
                price: 2300,
                currency: 'Dollar'
            }));
        var order = orderMock.object;
        var expectedResult = { status: true };
        orderMock.expects('save').yields(null, expectedResult);
        order.save(function (err, result) {
            orderMock.verify();
            orderMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the order is not saved
    it("should return error, if order not saved", function(done){
        var orderMock = sinon.mock(new _order(
        {   
            customer_name: 'Nike',
            customer_address: 'SF, USA',
            item_name: 'Macbook Pro',
            price: 2300,
            currency: 'Dollar'
        }));
        var order = orderMock.object;
        var expectedResult = { status: false };
        orderMock.expects('save').yields(expectedResult, null);
        order.save(function (err, result) {
            orderMock.verify();
            orderMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

// Test will pass if the order is updated based on an ID
describe('Update a order', function () {
    it('Should update the order with new value', function (done) {
        var orderMock = sinon.mock(new _order({   
            customer_name: 'Nike ASSN',
            customer_address: 'NYC, USA',
            item_name: 'Macbook'
        }));
        var order = orderMock.object;
        orderMock.expects('save').withArgs({_id: 4321}).yields(null, 'UPDATED');
        order.save({_id: 4321}, function(err, result){
            orderMock.verify();
            orderMock.restore();
            done();
        })
    });
});

// Test will pass if the order is deleted based on an ID
describe("Delete a order by id", function(){
    it("should delete a order by id", function(done){
        var orderMock = sinon.mock(_order);
        var expectedResult = { status: true };
        orderMock.expects('remove').withArgs({_id: 4321}).yields(null, expectedResult);
        _order.remove({_id: 4321}, function (err, result) {
            orderMock.verify();
            orderMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the order is not deleted based on an ID
    it("should return error if delete action is failed", function(done){
        var orderMock = sinon.mock(_order);
        var expectedResult = { status: false };
        orderMock.expects('remove').withArgs({_id: 4321}).yields(expectedResult, null);
        _order.remove({_id: 4321}, function (err, result) {
            orderMock.verify();
            orderMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});