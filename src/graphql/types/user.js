import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import User from '../../model';

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    })
});

const AuthenticationType = new GraphQLObjectType({
    name: 'Authentication',
    fields: () => ({
        token: { type: GraphQLString },
        user: { 
            type: UserType,
            resolve: async (parent, _) => {
                const user = await User.findById(parent.user._id);
                return user;
            }
        }
    })
});

export { UserType, AuthenticationType };