import { GraphQLID, GraphQLList } from 'graphql';
import { RoomType } from '../../types/location';
import Room from '../../../model/room';

export const fetchRoomById = () => ({
    type: RoomType,
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const room = await Room.findById(args.id);
        return room;
    }
});

export const fetchRooms = () => ({
    type: new GraphQLList(RoomType),
    resolve: async (_, __) => {
        const rooms = await Room.find();
        return rooms;
    }
});
