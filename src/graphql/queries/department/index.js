import { GraphQLID, GraphQLList } from 'graphql';
import { DepartmentType } from '../../types';
import Department from '../../../model/department';

export const fetchDepartmentById = () => ({
    type: DepartmentType,
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const department = await Department.findById(args.id);
        return department;
    }
});

export const fetchDepartments = () => ({
    type: new GraphQLList(DepartmentType),
    resolve: async (_, __) => {
        const departments = await Department.find();
        return departments;
    }
});