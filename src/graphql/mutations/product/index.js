import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList, GraphQLBoolean } from 'graphql';
import { ProductType } from '../../types/release_product';
import Product from '../../../model/product';
import { PlatformEnumType } from '../../types/enums';

export const addSubProductsToProduct = () => ({
    type: ProductType,
    args: {
        productId: { type: new GraphQLNonNull(GraphQLID) },
        subProductIds: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) }
    },
    async resolve(_, args) {
        const { productId, subProductIds } = args;
        const updatedProduct = await Product.findByIdAndUpdate(productId, { subProducts: subProductIds }, { new: true });
        return updatedProduct;
    }
});

export const createNewProduct = () => ({
    type: ProductType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        domain: { type: new GraphQLNonNull(GraphQLString) },
        platforms: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PlatformEnumType))) },
        isProductActive: { type: new GraphQLNonNull(GraphQLBoolean) }
    },
    async resolve(_, args) {
        const newProduct = await Product.create(args);
        return newProduct;
    }
});
