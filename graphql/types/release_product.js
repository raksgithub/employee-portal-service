const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } = require('graphql');
const { DateType } = require('./date');
const Product = require('../../model/product');
const Release = require('../../model/release');

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        currentRelease: { 
            type: ReleaseType,
            resolve: async (parent, _) => {
                const currentRelease = await Release.findOne({ productId: parent.id, isReleaseActive: true });
                return currentRelease;
            }
        },
        previousReleases: {
            type: new GraphQLList(ReleaseType),
            resolve: async (parent, _) => {
                const previousReleases = await Release.find({ productId: parent.id, isReleaseActive: false }).sort({ releaseEndDate: -1 });
                return previousReleases;
            }
        },
        upcomingReleases: { 
            type: ReleaseType,
            resolve: async (parent, _) => {
                const upcomingReleases = await Release.find({ productId: parent.id, releaseStartDate: { $gte: new Date() } });
                return upcomingReleases;
            } 
        },
        domain: { type: GraphQLString },
        platforms: { type: new GraphQLList(GraphQLString) },
        isProductActive: { type: GraphQLBoolean },
        subProducts: { 
            type: new GraphQLList(ProductType),
            resolve: async (parent, _) => {
                let subProducts = parent.subProducts;
                subProducts = await subProducts.map(async productId => {
                    return await Product.findById(productId);
                });
                return subProducts;
            } 
        }
    })
});

const ReleaseType = new GraphQLObjectType({
    name: 'Release',
    fields: () => ({
        id: { type: GraphQLID },
        releaseVersion: { type: GraphQLString },
        releaseType: { type: GraphQLString },
        releaseStartDate: { type: DateType },
        releaseEndDate: { type: DateType },
        isReleaseActive: { type: GraphQLBoolean },
        product: { 
            type: ProductType,
            resolve: async (parent, _) => {
                const product = await Product.findById(parent.productId);
                return product;
            } 
        }
    })
});

module.exports = { ReleaseType, ProductType };