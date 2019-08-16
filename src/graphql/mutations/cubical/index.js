import { GraphQLID, GraphQLNonNull } from 'graphql';
import { CubicalType } from '../../types/location';
import Cubical from '../../../model/cubical';

export const createCubical = () => ({
    type: CubicalType,
    args: {
        roomId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, args) => {
        const { roomId } = args;
        const newCubical = await Cubical.create({
            roomNo: roomId
        });
        return newCubical;
    }
});
 