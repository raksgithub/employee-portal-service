const { GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLID } = require('graphql');
const { ReleaseType } = require('../../types/release_product');
const { DateType } = require('../../types/date');
const Release = require('../../../model/release');

const addProductToRelease = () => ({
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

const createNewRelease = () => ({
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

module.exports = { createNewRelease, addProductToRelease };