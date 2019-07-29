const { GraphQLID, GraphQLList } = require('graphql');
const { CubicalType } = require('../../types/location');
const Cubical = require('../../../model/cubical');

const fetchCubicalById = () => ({
    type: CubicalType,
    args: { 
        id: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const cubical = await Cubical.findById(args.id);
        return cubical;
    }
});

const fetchCubicals = () => ({
    type: new GraphQLList(CubicalType),
    resolve: async (_, __) => {
        const cubicals = await Cubical.find();
        return cubicals;
    }
});

module.exports = { fetchCubicalById, fetchCubicals };