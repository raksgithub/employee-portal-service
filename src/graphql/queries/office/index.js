import { GraphQLID, GraphQLList } from 'graphql';
import { OfficeType } from '../../types/office';
import Office from '../../../model/office';

export const fetchOfficeById = () => ({
    type: OfficeType,
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const office = await Office.findById(args.id);
        return office;
    }
});

export const fetchOffices = () => ({
    type: new GraphQLList(OfficeType),
    resolve: async (_, __) => {
        const offices = await Office.find();
        return offices;
    }
});
