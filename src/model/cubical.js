import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CubicalSchema = new Schema({
    // RoomNo where this cubical exists
    // roomNo = roomId
    roomNo: String,
});

export default mongoose.model('Cubical', CubicalSchema);