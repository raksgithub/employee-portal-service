import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: String,
    domain: String,
    description: String
});

export default mongoose.model('Project', ProjectSchema);