const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInputObjectType, GraphQLInt } = require('graphql');
const Project = require('../../model/project');
const Employee = require('../../model/employee');
const { DateType } = require('./date');
const { CubicalType } = require('./location');
const Cubical = require('../../model/cubical');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        domain: { type: GraphQLString },
        description: { type: GraphQLString },
        employees: { 
            type: new GraphQLList(EmployeeType),
            async resolve(parent, args) {
                const employees = Employee.find({ currentProjectId: parent.id });
                return employees;
            } 
        }
    })
});

const ExperienceInputType = new GraphQLInputObjectType({
    name: 'ExperienceInput',
    fields: () => ({
        joiningDate: { type: DateType },
        totalExperience: { type: GraphQLString },
        skillSet: { type: new GraphQLList(GraphQLString) }
    })
});

const ExperienceType = new GraphQLObjectType({
    name: 'Experience',
    fields: () => ({
        joiningDate: { type: DateType },
        totalExperience: { type: GraphQLString },
        skillSet: { type: new GraphQLList(GraphQLString) }
    })
});

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        assetNo: { type: GraphQLInt },
        designation: { type: GraphQLString },
        department: { type: GraphQLString },
        currentProject: {
            type: ProjectType,
            async resolve(parent, _) {
                const project = await Project.findById(parent.currentProjectId);
                return project;
            }
        },
        previousProjects: {
            type: new GraphQLList(ProjectType),
            async resolve(parent, _) {
                let previousProjects = parent.previousProjectIds;
                previousProjects = await previousProjects.map(async projectId => {
                    return await Project.findById(projectId);
                });
                return previousProjects;
            }
        },
        experience: {
            type: ExperienceType
        },
        employeesComeUnder: {
            type: new GraphQLList(EmployeeType),
            resolve: async (parent, _) => {
                // console.log('parent:', parent);
                // console.log('Args:', args);
                let employees = parent.employeesComeUnder;
                employees = await employees.map(async employeeId => {
                    return await Employee.findById(employeeId);
                });
                //console.log('employees:', employees);
                return employees;
            }
        },
        cubical: {
            type: CubicalType,
            resolve: async (parent, _) => {
                const cubical = await Cubical.findById(parent.cubicalNo);
                return cubical;
            }
        }
    })
});

module.exports = { UserType, EmployeeType, ExperienceInputType, ProjectType };