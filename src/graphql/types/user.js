const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const User = require('../../model');

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

module.exports = { UserType, AuthenticationType };