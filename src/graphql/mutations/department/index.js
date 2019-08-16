import { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';
import { DepartmentType } from '../../types';
import Department from '../../../model/department';

export const createDepartment = () => ({
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
