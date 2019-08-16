import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    domain: String,
    platforms: { type: [String], index: true },
    isProductActive: Boolean,
    subProducts: { type: [String], index: true }
});

export default mongoose.model('Product', ProductSchema);