const { GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLID, GraphQLList } = require('graphql');
const { RoomType } = require('../../types/location');
const Room = require('../../../model/room');

const createRoom = () => ({
    type: RoomType,
    args: {
        roomNo: { type: new GraphQLNonNull(GraphQLInt) },
        floor: { type: new GraphQLNonNull(GraphQLString) },
        block: { type: new GraphQLNonNull(GraphQLString) },
        buildingNo: { type: new GraphQLNonNull(GraphQLString) },
        officeLocation: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: async (_, args) => {
        const newRoom = await Room.create(args);
        return newRoom;
    }
});

module.exports = { createRoom };