const { GraphQLID, GraphQLList } = require('graphql');
const { ReleaseType } = require('../../types/release_product');
const Release = require('../../../model/release');

const fetchReleaseById = () => ({
    type: ReleaseType,
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const release = await Release.findById(args.id);
        return release;
    }
});

const fetchReleases = () => ({
    type: new GraphQLList(ReleaseType),
    resolve: async (_, __) => {
        const releases = await Release.find();
        return releases;
    }
});

module.exports = { fetchReleaseById, fetchReleases };