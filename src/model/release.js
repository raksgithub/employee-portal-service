const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReleaseSchema = new Schema({
    releaseVersion: String,
    releaseType: String,
    releaseStartDate: { type: Date, default: Date.now },
    releaseEndDate: { type: Date, default: Date.now },
    isReleaseActive: Boolean,
    productId: String
});

module.exports = mongoose.model('Release', ReleaseSchema);