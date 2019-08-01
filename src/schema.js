const { GraphQLSchema } = require('graphql');
const { RootQuery } = require('./graphql/queries');
const { RootMutation } = require('./graphql/mutations');

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});