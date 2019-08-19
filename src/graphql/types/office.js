import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInputObjectType } from 'graphql';

const AddressInputType = new GraphQLInputObjectType({
    name: 'AddressInput',
    fields: {
        building: { type: GraphQLString },
        street: { type: GraphQLString },
        landmark: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        zip: { type: GraphQLString }
    }
});

const AddressType = new GraphQLObjectType({
    name: 'Address',
    fields: {
        building: { type: GraphQLString },
        street: { type: GraphQLString },
        landmark: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        zip: { type: GraphQLString }
    }
});

const OfficeType = new GraphQLObjectType({
    name: 'Office',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        address: { type: AddressType }
    })
});

export { OfficeType, AddressInputType };