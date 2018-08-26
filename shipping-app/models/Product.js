var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: Number,
  is_deleted: { type: Boolean, default: false},
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', ProductSchema);