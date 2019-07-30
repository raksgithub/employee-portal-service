const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name: String,
    functionality: String,
    majorAreas: { type: [String], index: true }
});

module.exports = mongoose.model('Department', DepartmentSchema);