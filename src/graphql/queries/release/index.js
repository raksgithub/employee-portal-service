import { GraphQLID, GraphQLList } from 'graphql';
import { ReleaseType } from '../../types/release_product';
import Release from '../../../model/release';

export const fetchReleaseById = () => ({
    type: ReleaseType,
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const release = await Release.findById(args.id);
        return release;
    }
});

export const fetchReleases = () => ({
    type: new GraphQLList(ReleaseType),
    resolve: async (_, __) => {
        const releases = await Release.find();
        return releases;
    }
});
