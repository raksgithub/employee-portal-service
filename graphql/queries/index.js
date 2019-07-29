const { GraphQLObjectType } = require('graphql');
const { fetchUserById, fetchUsers } = require('./user');
const { fetchEmployeeById, fetchEmployees } = require('./employee');
const { fetchProjectById, fetchProjects } = require('./project');
const { fetchAssetById, fetchAssets } = require('./asset');
const { fetchCubicalById, fetchCubicals } = require('./cubical');
const { fetchRoomById, fetchRooms } = require('./room');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        user: fetchUserById(),
        users: fetchUsers(),
        employee: fetchEmployeeById(),
        employees: fetchEmployees(),
        project: fetchProjectById(),
        projects: fetchProjects(),
        asset: fetchAssetById(),
        assets: fetchAssets(),
        cubical: fetchCubicalById(),
        cubicals: fetchCubicals(),
        room: fetchRoomById(),
        rooms: fetchRooms()
    }
});

module.exports = { RootQuery };