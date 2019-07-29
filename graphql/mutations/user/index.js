const { GraphQLString } = require('graphql');
const { UserType } = require('../../types');
const User = require('../../../model');

const createUser = () => ({
    type: UserType,
    args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(_, args, __) {
        const user = {
            username: args.username,
            password: args.password
        }
        const newUser = await User.create(user);
        return newUser;
    }
});

module.exports = { createUser };