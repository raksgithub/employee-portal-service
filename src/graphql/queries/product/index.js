import { GraphQLID, GraphQLList } from 'graphql';
import { ProductType } from '../../types/release_product';
import Product from '../../../model/product';

export const fetchProductById = () => ({
    type: ProductType,
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const product = await Product.findById(args.id);
        return product;
    }
});

export const fetchProducts = () => ({
    type: new GraphQLList(ProductType),
    resolve: async (_, __) => {
        const products = await Product.find();
        return products;
    }
});
