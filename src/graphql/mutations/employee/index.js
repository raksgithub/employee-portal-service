import { GraphQLString, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import { EmployeeType, ExperienceInputType, EmployeeGeneralInfoInputType } from '../../types';
import Employee from '../../../model/employee';

export const createEmployee = () => ({
    type: EmployeeType,
    description: 'Create a new employee using this mutation.',
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        designation: { type: new GraphQLNonNull(GraphQLString) },
        department: { type: new GraphQLNonNull(GraphQLID) },
        currentProject: { type: new GraphQLNonNull(GraphQLID) },
        previousProjects: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
        experience: { type: new GraphQLNonNull(ExperienceInputType) }
    },
    async resolve(_, args) {
        const employee = {
            name: args.name,
            designation: args.designation,
            department: args.department,
            currentProjectId: args.currentProject,
            previousProjectIds: args.previousProjects,
            experience: args.experience
        }
        const newEmployee = await Employee.create(employee);
        return newEmployee;
    }
});

export const addRelationshipToEmployees = () => ({
    type: EmployeeType,
    args: {
        sourceEmployee: {
            type: new GraphQLNonNull(GraphQLID)
        },
        targetEmployee: {
            type: new GraphQLNonNull(GraphQLID)
        },
        type: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }, 
    resolve: async (_, args) => {
        const sourceEmployee = await Employee.findById(args.sourceEmployee);
        const employeesComeUnder = [ ...sourceEmployee.employeesComeUnder, args.targetEmployee ];
        const updatedSourceEmployee = await Employee.findByIdAndUpdate(args.sourceEmployee, { type: args.type, employeesComeUnder }, { new: true });
        return updatedSourceEmployee;
    }
});

export const assignCubicalToEmployee = () => ({
    type: EmployeeType,
    args: {
        employeeId: { type: new GraphQLNonNull(GraphQLID) },
        cubicalId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, args) => {
        const updatedEmployee = await Employee.findByIdAndUpdate(args.employeeId, { cubicalNo: args.cubicalId }, { new: true });
        return updatedEmployee;
    }
});

export const assignEmployeeToDepartment = () => ({
    type: EmployeeType,
    args: {
        employeeId: { type: new GraphQLNonNull(GraphQLID) },
        departmentId: { type: new GraphQLNonNull(GraphQLID) }
    },
    resolve: async (_, args) => {
        const updatedEmployee = await Employee.findByIdAndUpdate(args.employeeId, { department: args.departmentId }, { new: true });
        return updatedEmployee;
    }
});

export const addEmployeeGenralInfo = () => ({
    type: EmployeeType,
    args: {
        empId: { type: new GraphQLNonNull(GraphQLID) },
        generalInfo: { type: new GraphQLNonNull(EmployeeGeneralInfoInputType) }
    },
    resolve: async (_, args) => {
        const { empId, generalInfo } = args;
        const updatedEmployee = await Employee.findByIdAndUpdate(empId, { generalInfo }, { new: true });
        return updatedEmployee;
    }
});
