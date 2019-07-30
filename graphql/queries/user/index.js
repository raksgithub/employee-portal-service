const { GraphQLID, GraphQLList } = require('graphql');
const { UserType } = require('../../types/user');
const User = require('../../../model');

const fetchUserById = () => ({
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

const fetchUsers = () => ({
    type: new GraphQLList(UserType),
    async resolve(_, __, context) {
        if(!context.userId) {
            throw new Error('Token is not provided. Please provide authoriztion token.');
        }
        const users = await User.find();
        return users;
    }
});

module.exports = { fetchUserById, fetchUsers };