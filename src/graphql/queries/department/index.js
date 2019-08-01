const { GraphQLID, GraphQLList } = require('graphql');
const { DepartmentType } = require('../../types');
const Department = require('../../../model/department');

const fetchDepartmentById = () => ({
    type: DepartmentType,
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const department = await Department.findById(args.id);
        return department;
    }
});

const fetchDepartments = () => ({
    type: new GraphQLList(DepartmentType),
    resolve: async (_, __) => {
        const departments = await Department.find();
        return departments;
    }
});

module.exports = { fetchDepartmentById, fetchDepartments };