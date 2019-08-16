import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name: String,
    type: String,
    assetNo: Number,
    designation: String,
    department: String,
    currentProjectId: String,
    cubicalNo: String,
    previousProjectIds: { type: [String], index: true },
    experience: {
        joiningDate: { type: Date, default: Date.now },
        skillSet: { type: [String], index: true },
        totalExperience: String
    },
    employeesComeUnder: { type: [String], index: true },
    generalInfo: {
        firstName: String,
        middleName: String,
        lastName: String,
        dob: { type: Date, default: Date.now },
        gender: String,
        address: String,
        contactNo: String,
        maidenName: String,
        fatherName: String,
        motherName: String,
        maritalStatus: String,
        spouseName: String,
        children: Number
    }
});

export default mongoose.model('Employee', EmployeeSchema);