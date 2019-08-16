import mongoose from 'mongoose';
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

export default mongoose.model('User', UserSchema);