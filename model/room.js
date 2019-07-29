const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    roomNo: String,
    floor: String,
    block: String,
    buildingNo: String,
    officeLocation: String,
    cubicals: { type: String, index: true }
});

module.exports = mongoose.model('Room', RoomSchema);