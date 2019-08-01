const { GraphQLString, GraphQLNonNull } = require('graphql');
const { OfficeType, AddressInputType } = require('../../types/office');
const Office = require('../../../model/office');

const createNewOffice = () => ({
    type: OfficeType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        address: { type: new GraphQLNonNull(AddressInputType) }
    },
    async resolve(_, args) {
        const newOffice = await Office.create(args);
        return newOffice;
    }
});

module.exports = { createNewOffice };