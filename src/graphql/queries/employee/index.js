import { GraphQLID, GraphQLList } from 'graphql';
import { EmployeeType } from '../../types';
import Employee from '../../../model/employee';

export const fetchEmployeeById = () => ({
    type: EmployeeType,
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent, args) {
        const employee = await Employee.findById(args.id);
        return employee; 
    }
});

export const fetchEmployees = () => ({
    type: new GraphQLList(EmployeeType),
    async resolve() {
        const employees = await Employee.find();
        return employees;
    }
});
