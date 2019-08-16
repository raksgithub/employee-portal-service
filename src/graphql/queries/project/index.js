import { GraphQLID, GraphQLList } from 'graphql';
import { ProjectType } from '../../types';
import Project from '../../../model/project';

export const fetchProjectById = () => ({
    type: ProjectType, 
    args: {
        id: { type: GraphQLID }
    },
    async resolve(parent, args) {
        const project = await Project.findById(args.id);
        return project;
    }
});

export const fetchProjects = () => ({
    type: new GraphQLList(ProjectType),
    async resolve(parent, args) {
        const projects = await Project.find();
        return projects;
    }
});
