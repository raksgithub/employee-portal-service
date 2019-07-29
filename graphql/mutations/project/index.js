const { GraphQLString, GraphQLNonNull } = require('graphql');
const { ProjectType } = require('../../types');
const Project = require('../../../model/project');

const createProject = () => ({
    type: ProjectType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        domain: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(parent, args) {
        const project = {
            name: args.name,
            domain: args.domain,
            description: args.description
        }
        const newProject = await Project.create(project);
        return newProject;
    }
});

module.exports = { createProject };