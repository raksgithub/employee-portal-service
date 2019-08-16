import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
    name: String,
    assetNo: Number,
    // Employees for which the asset is tagged to
    taggedTo: { type: [String], index: true },
    specifications: {
        model: String,
        dateOfPurchase: { type: Date, default: Date.now },
        starRating: String,
        description: String
    },
    // Cubical no where this asset is located
    location: String
});

export default mongoose.model('Asset', AssetSchema);