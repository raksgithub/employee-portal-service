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
    async resolve(parent, args, context) {
        const user = await User.findById(args.id);
        return user;
    }
});

const fetchUsers = () => ({
    type: new GraphQLList(UserType),
    async resolve(parent, __, ___) {
        const users = await User.find();
        return users;
    }
});

module.exports = { fetchUserById, fetchUsers };