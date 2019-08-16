import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: String,
    founded: { type: Date, default: Date.now },
    description: String,
    // This is linked to other companies
    subsidiaries: { type: [String], index: true },
    stockPrice: String,
    revenue: String,
    license: String,
    /* Below fields to be linked in individual graphql type with companyId field */
    // offices: { type: [String], index: true },
    // employees: { type: [String], index: true },
    // projects: { type: [String], index: true },
    // products: { type: [String], index: true },
    // departments: { type: [String], index: true },
    //founders: { type: [String], index: true }
});

export default mongoose.model('Company', CompanySchema);