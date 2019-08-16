import { GraphQLID, GraphQLList } from 'graphql';
import Asset from '../../../model/asset';
import { AssetType } from '../../types/asset';

export const fetchAssetById = () => ({
    type: AssetType,
    args: {
        id: { type: GraphQLID }
    },
    resolve: async (_, args, context) => {
        console.log('context:', context);
        const asset = await Asset.findById(args.id);
        return asset;
    }
});

export const fetchAssets = () => ({
    type: new GraphQLList(AssetType),
    resolve: async (_, __) => {
        const assets = await Asset.find();
        return assets;
    }
}); 