import { GraphQLString, GraphQLNonNull } from 'graphql';
import { OfficeType, AddressInputType } from '../../types/office';
import Office from '../../../model/office';

export const createNewOffice = () => ({
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
