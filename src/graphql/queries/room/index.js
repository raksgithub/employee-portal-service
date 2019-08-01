const { GraphQLID, GraphQLList } = require('graphql');
const { RoomType } = require('../../types/location');
const Room = require('../../../model/room');

const fetchRoomById = () => ({
    type: RoomType,
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const room = await Room.findById(args.id);
        return room;
    }
});

const fetchRooms = () => ({
    type: new GraphQLList(RoomType),
    resolve: async (_, __) => {
        const rooms = await Room.find();
        return rooms;
    }
});

module.exports = { fetchRoomById, fetchRooms };