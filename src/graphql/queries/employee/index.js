const { GraphQLID, GraphQLList } = require('graphql');
const { EmployeeType } = require('../../types');
const Employee = require('../../../model/employee');

const fetchEmployeeById = () => ({
    type: EmployeeType,
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent, args) {
        const employee = await Employee.findById(args.id);
        return employee; 
    }
});

const fetchEmployees = () => ({
    type: new GraphQLList(EmployeeType),
    async resolve() {
        const employees = await Employee.find();
        return employees;
    }
});

module.exports = { fetchEmployeeById, fetchEmployees };