const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInputObjectType, GraphQLInt, GraphQLList } = require('graphql');
const { EmployeeType } = require('./index');
const Employee = require('../../model/employee');
const Cubical = require('../../model/cubical');
const { CubicalType } = require('./location');
const { DateType } = require('./date');

const SpecificationsInputType = new GraphQLInputObjectType({
    name: 'SpecificationsInput',
    fields: () => ({
        model: { type: GraphQLString },
        dateOfPurchase: { type: DateType },
        starRating: { type: GraphQLString },
        description: { type: GraphQLString }
    })
});

const SpecificationsType = new GraphQLObjectType({
    name: 'Specifications',
    fields: () => ({
        model: { type: GraphQLString },
        dateOfPurchase: { type: DateType },
        starRating: { type: GraphQLString },
        description: { type: GraphQLString }
    })
});

// To be continue from here
// Todo: taggedTo field is not getting resolved dynamically.
const AssetType = new GraphQLObjectType({
    name: 'Asset',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        assetNo: { type: GraphQLInt },
        specifications: { type: SpecificationsType },
        // This field will be resolved dynamically when we query this field
        taggedTo: {
            type: new GraphQLList(EmployeeType),
            resolve: async (parent, _) => {
                let employees = parent.taggedTo;
                employees = await employees.map(async empId => {
                    return await Employee.findById(empId);
                });
                return employees;
            }
        },
        // This field will be resolved dynamically when we query this field
        cubical: {
            type: CubicalType,
            resolve: async (parent, _) => {
                const cubical = await Cubical.findById(parent.location);
                return cubical;
            }
        }
    })
});

module.exports = { AssetType, SpecificationsInputType };