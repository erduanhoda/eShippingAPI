var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
    customer_name: String,
    customer_address: String,
    item_name: String,
    price: Number,
    currency: String,
    is_deleted: { type: Boolean, default: false},
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);