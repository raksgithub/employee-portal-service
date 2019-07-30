const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql');
const { DepartmentType } = require('../../types');
const Department = require('../../../model/department');

const createDepartment = () => ({
    type: DepartmentType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        functionality: { type: new GraphQLNonNull(GraphQLString) },
        majorAreas: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
        noOfEmployees: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) }
    },
    resolve: async (_, args) => {
        const newDepartment = await Department.create(args);
        return newDepartment;
    }
});

module.exports = { createDepartment };  