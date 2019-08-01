const { GraphQLID, GraphQLList } = require('graphql');
const { OfficeType } = require('../../types/office');
const Office = require('../../../model/office');

const fetchOfficeById = () => ({
    type: OfficeType,
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const office = await Office.findById(args.id);
        return office;
    }
});

const fetchOffices = () => ({
    type: new GraphQLList(OfficeType),
    resolve: async (_, __) => {
        const offices = await Office.find();
        return offices;
    }
});

module.exports = { fetchOfficeById, fetchOffices };