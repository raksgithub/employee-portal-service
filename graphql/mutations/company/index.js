const { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList } = require('graphql');
const { CompanyType } = require('../../types');
const Company = require('../../../model/company');
const { DateType } = require('../../types/date');

const createNewCompany = () => ({
    type: CompanyType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        founded: { type: new GraphQLNonNull(DateType) },
        stockPrice: { type: new GraphQLNonNull(GraphQLString) },
        revenue: { type: new GraphQLNonNull(GraphQLString) },
        license: { type: new GraphQLNonNull(GraphQLString) },
        subsidiaries: { type: new GraphQLList(new GraphQLNonNull(GraphQLID)) }
    },
    resolve: async (_, args) => {
        const newCompany = await Company.create(args);
        return newCompany;
    }
});

module.exports = { createNewCompany };  