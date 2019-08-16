import { GraphQLSchema } from 'graphql';
import QueryType from './graphql/queries';
import MutationType from './graphql/mutations';

export default new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});