import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } from 'graphql';
import Room from '../../model/room';
import Cubical from '../../model/cubical';

export const RoomType = new GraphQLObjectType({
    name: 'Room',
    fields: () => ({
        id: { type: GraphQLID },
        roomNo: { type: GraphQLInt },
        floor: { type: GraphQLString },
        block: { type: GraphQLString },
        buildingNo: { type: GraphQLString },
        officeLocation: { type: GraphQLString },
        cubicals: {
            type: new GraphQLList(CubicalType),
            resolve: async (parent, _) => {
                const cubicals = await Cubical.find({ roomNo: parent.id });
                return cubicals;
            }
        }
    })
});

export const CubicalType = new GraphQLObjectType({
    name: 'Cubical',
    fields: () => ({
        id: { type: GraphQLID },
        room: { 
            type: RoomType,
            resolve: async (parent, _) => {
                return await Room.findById(parent.roomNo);
            }
        }
    })
});
