const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    domain: String,
    platforms: { type: [String], index: true },
    isProductActive: Boolean,
    subProducts: { type: [String], index: true }
});

module.exports = mongoose.model('Product', ProductSchema);