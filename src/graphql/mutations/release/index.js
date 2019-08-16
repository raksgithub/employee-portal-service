import { GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLID } from 'graphql';
import { ReleaseType } from '../../types/release_product';
import { DateType } from '../../types/date';
import Release from '../../../model/release';

export const addProductToRelease = () => ({
    type: ReleaseType,
    args: {
        productId: { type: GraphQLID },
        releaseId: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const { productId, releaseId } = args;
        const updatedRelease = await Release.findByIdAndUpdate(releaseId, { productId }, { new: true });
        return updatedRelease;
    }
});

export const createNewRelease = () => ({
    type: ReleaseType,
    args: {
        releaseVersion: { type: new GraphQLNonNull(GraphQLString) },
        releaseType: { type: new GraphQLNonNull(GraphQLString) },
        releaseStartDate: { type: new GraphQLNonNull(DateType) },
        releaseEndDate: { type: new GraphQLNonNull(DateType) },
        isReleaseActive: { type: new GraphQLNonNull(GraphQLBoolean) },
        product: { type: GraphQLID }
    },
    async resolve(_, args) {
        const newRelease = await Release.create(args);
        return newRelease;
    }
});
