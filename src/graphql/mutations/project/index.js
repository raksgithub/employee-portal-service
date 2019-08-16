import { GraphQLString, GraphQLNonNull } from 'graphql';
import { ProjectType } from '../../types';
import Project from '../../../model/project';

export const createProject = () => ({
    type: ProjectType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        domain: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) }
    },
    async resolve(_, args) {
        const project = {
            name: args.name,
            domain: args.domain,
            description: args.description
        }
        const newProject = await Project.create(project);
        return newProject;
    }
});
