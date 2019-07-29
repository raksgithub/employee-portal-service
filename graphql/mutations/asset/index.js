const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLInt } = require('graphql');
const { AssetType, SpecificationsInputType } = require('../../types/asset');
const Asset = require('../../../model/asset');
const Employee = require('../../../model/employee');

const tagEmployeeToAsset = () => ({
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

const createNewAsset = () => ({
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

module.exports = { createNewAsset, tagEmployeeToAsset }; 