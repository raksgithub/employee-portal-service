const { GraphQLID, GraphQLList } = require('graphql');
const Asset = require('../../../model/asset');
const { AssetType } = require('../../types/asset');

const fetchAssetById = () => ({
    type: AssetType,
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const asset = await Asset.findById(args.id);
        return asset;
    }
});

const fetchAssets = () => ({
    type: new GraphQLList(AssetType),
    resolve: async (_, __) => {
        const assets = await Asset.find();
        return assets;
    }
});

module.exports = { fetchAssetById, fetchAssets };  