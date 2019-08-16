import { GraphQLID, GraphQLList } from 'graphql';
import { CompanyType } from '../../types/';
import Company from '../../../model/company';

export const fetchCompanyById = () => ({
    type: CompanyType,
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const company = await Company.findById(args.id);
        return company;
    }
});

export const fetchCompanies = () => ({
    type: new GraphQLList(CompanyType),
    resolve: async (_, __) => {
        const companies = await Company.find();
        return companies;
    }
});