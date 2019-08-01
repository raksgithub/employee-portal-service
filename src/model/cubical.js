const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CubicalSchema = new Schema({
    // RoomNo where this cubical exists
    // roomNo = roomId
    roomNo: String,
});

module.exports = mongoose.model('Cubical', CubicalSchema);