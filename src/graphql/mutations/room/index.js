import { GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';
import { RoomType } from '../../types/location';
import Room from '../../../model/room';

export const createRoom = () => ({
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
