const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OfficeSchema = new Schema({
    name: String,
    address: {
        building: String,
        street: String,
        landmark: String,
        city: String,
        state: String,
        country: String,
        zip: String
    }
});

module.exports = mongoose.model('Office', OfficeSchema);