const { GraphQLID, GraphQLList } = require('graphql');
const { ProductType } = require('../../types/release_product');
const Product = require('../../../model/product');

const fetchProductById = () => ({
    type: ProductType,
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const product = await Product.findById(args.id);
        return product;
    }
});

const fetchProducts = () => ({
    type: new GraphQLList(ProductType),
    resolve: async (_, __) => {
        const products = await Product.find();
        return products;
    }
});

module.exports = { fetchProductById, fetchProducts };