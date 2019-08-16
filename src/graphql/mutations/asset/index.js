import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt } from 'graphql';
import { AssetType, SpecificationsInputType } from '../../types/asset';
import Asset from '../../../model/asset';
import Employee from '../../../model/employee';

export const tagEmployeeToAsset = () => ({
    type: AssetType,
    args: {
        assetId: { type: GraphQLID },
        employeeId: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const { assetId, employeeId } = args;
        const requiredAsset = await Asset.findById(assetId);
        const newTaggedEmployees = [ ...requiredAsset.taggedTo, employeeId ];
        await newTaggedEmployees.forEach(async employeeId => {
            await Employee.findByIdAndUpdate(employeeId, { assetNo: requiredAsset.assetNo });
        });
        const taggedAsset = await Asset.findByIdAndUpdate(assetId, { taggedTo: newTaggedEmployees }, { new: true });
        return taggedAsset;
    }
});

export const createNewAsset = () => ({
    type: AssetType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        assetNo: { type: new GraphQLNonNull(GraphQLInt) },
        specifications: { type: new GraphQLNonNull(SpecificationsInputType) },
        location: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const newAsset = await Asset.create(args);
        return newAsset;
    }
});
 