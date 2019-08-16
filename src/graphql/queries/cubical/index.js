import { GraphQLID, GraphQLList } from 'graphql';
import { CubicalType } from '../../types/location';
import Cubical from '../../../model/cubical';

export const fetchCubicalById = () => ({
    type: CubicalType,
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const cubical = await Cubical.findById(args.id);
        return cubical;
    }
});

export const fetchCubicals = () => ({
    type: new GraphQLList(CubicalType),
    resolve: async (_, __) => {
        const cubicals = await Cubical.find();
        return cubicals;
    }
});
