const { GraphQLID, GraphQLList } = require('graphql');
const { CompanyType } = require('../../types/');
const Company = require('../../../model/company');

const fetchCompanyById = () => ({
    type: CompanyType,
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const company = await Company.findById(args.id);
        return company;
    }
});

const fetchCompanies = () => ({
    type: new GraphQLList(CompanyType),
    resolve: async (_, __) => {
        const companies = await Company.find();
        return companies;
    }
});

module.exports = { fetchCompanyById, fetchCompanies };