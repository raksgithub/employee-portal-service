const { GraphQLID } = require('graphql');
const { CubicalType } = require('../../types/location');
const Cubical = require('../../../model/cubical');

const createCubical = () => ({
    type: CubicalType,
    args: {
        roomId: { type: GraphQLID }
    },
    resolve: async (_, args) => {
        const { roomId } = args;
        const newCubical = await Cubical.create({
            roomNo: roomId
        });
        return newCubical;
    }
});

module.exports = { createCubical };  