const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: String,
    founded: { type: Date, default: Date.now },
    description: String,
    offices: { type: [String], index: true },
    subsidiaries: { type: [String], index: true },
    employees: { type: [String], index: true },
    projects: { type: [String], index: true },
    products: { type: [String], index: true },
    departments: { type: [String], index: true },
    stockPrice: String,
    revenue: String,
    founders: { type: [String], index: true },
    license: String
});

module.exports = mongoose.model('Company', CompanySchema);