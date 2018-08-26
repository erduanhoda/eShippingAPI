var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
    _id: String,
    address: String,
    is_deleted: { type: Boolean, default: false},
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Customer', CustomerSchema);