import { GraphQLID, GraphQLList } from 'graphql';
import { UserType } from '../../types/user';
import User from '../../../model';

export const fetchUserById = () => ({
    type: UserType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    async resolve(_, args, context) {
        if(!context.userId) {
            throw new Error('Token is not provided. Please provide authoriztion token.');
        }
        const user = await User.findById(args.id);
        return user;
    }
});

export const fetchUsers = () => ({
    type: new GraphQLList(UserType),
    async resolve(_, __, context) {
        if(!context.userId) {
            throw new Error('Token is not provided. Please provide authoriztion token.');
        }
        const users = await User.find();
        return users;
    }
});
