import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    roomNo: String,
    floor: String,
    block: String,
    buildingNo: String,
    officeLocation: String,
    cubicals: { type: String, index: true }
});

export default mongoose.model('Room', RoomSchema);