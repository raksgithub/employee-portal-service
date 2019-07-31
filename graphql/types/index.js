const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInputObjectType, GraphQLInt } = require('graphql');
const Project = require('../../model/project');
const Employee = require('../../model/employee');
const { DateType } = require('./date');
const { CubicalType } = require('./location');
const Cubical = require('../../model/cubical');
const Department = require('../../model/department');
const Company = require('../../model/company');

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    description: 'This is project type.',
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
    description: 'This is experience input type.',
    fields: () => ({
        joiningDate: { type: DateType },
        totalExperience: { type: GraphQLString },
        skillSet: { type: new GraphQLList(GraphQLString) }
    })
});

const ExperienceType = new GraphQLObjectType({
    name: 'Experience',
    description: 'This is experience type.',
    fields: () => ({
        joiningDate: { type: DateType },
        totalExperience: { type: GraphQLString },
        skillSet: { type: new GraphQLList(GraphQLString) }
    })
});

const EmployeeType = new GraphQLObjectType({
    name: 'Employee',
    description: 'This is employee type.',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        assetNo: { type: GraphQLInt },
        designation: { type: GraphQLString },
        department: { 
            type: DepartmentType,
            resolve: async (parent, _) => {
                const department = await Department.findById(parent.department);
                return department;
            }
        },
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

const DepartmentType = new GraphQLObjectType({
    name: 'Department',
    description: 'This is department type',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        noOfEmployees: { 
            type: new GraphQLList(EmployeeType),
            resolve: async (parent, _) => {
                const employees = await Employee.find({ department: parent.id });
                return employees;
            } 
        },
        functionality: { type: GraphQLString },
        majorAreas: { type: new GraphQLList(GraphQLString) }
    })
});

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    description: 'This is company type.',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        founded: { type: DateType },
        description: { type: GraphQLString },
        stockPrice: { type: GraphQLString },
        revenue: { type: GraphQLString },
        license: { type: GraphQLString },
        subsidiaries: {
            type: new GraphQLList(CompanyType),
            resolve: async (parent, _) => {
                let subsidiaries = parent.subsidiaries;
                subsidiaries = await subsidiaries.map(async companyId => {
                    return await Company.findById(companyId);
                });
                return subsidiaries;
            }
        }
    })
});

module.exports = { EmployeeType, ExperienceInputType, ProjectType, DepartmentType, CompanyType };