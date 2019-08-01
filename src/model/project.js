const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: String,
    domain: String,
    description: String
});

module.exports = mongoose.model('Project', ProjectSchema);