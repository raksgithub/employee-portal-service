const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    name: String,
    email: String,
    password: String,
    createdAt: {
        type: String,
        default: new Date()
    }
});

module.exports = mongoose.model('User', UserSchema);