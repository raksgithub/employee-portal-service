const { GraphQLID, GraphQLList } = require('graphql');
const { ProjectType } = require('../../types');
const Project = require('../../../model/project');

const fetchProjectById = () => ({
    type: ProjectType, 
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent, args) {
        const project = await Project.findById(args.id);
        return project;
    }
});

const fetchProjects = () => ({
    type: new GraphQLList(ProjectType),
    async resolve(parent, args) {
        const projects = await Project.find();
        return projects;
    }
});

module.exports = { fetchProjectById, fetchProjects };