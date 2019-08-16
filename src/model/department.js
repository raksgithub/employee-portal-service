import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
    name: String,
    functionality: String,
    majorAreas: { type: [String], index: true }
});

export default mongoose.model('Department', DepartmentSchema);