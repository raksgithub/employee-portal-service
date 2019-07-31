const { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList, GraphQLBoolean } = require('graphql');
const { ProductType } = require('../../types/release_product');
const Product = require('../../../model/product');

const addSubProductsToProduct = () => ({
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

const createNewProduct = () => ({
    type: ProductType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        domain: { type: new GraphQLNonNull(GraphQLString) },
        platforms: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))) },
        isProductActive: { type: new GraphQLNonNull(GraphQLBoolean) }
    },
    async resolve(_, args) {
        const newProduct = await Product.create(args);
        return newProduct;
    }
});

module.exports = { createNewProduct, addSubProductsToProduct };