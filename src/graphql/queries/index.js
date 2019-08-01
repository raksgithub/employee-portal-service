const { GraphQLObjectType } = require('graphql');
const { fetchUserById, fetchUsers } = require('./user');
const { fetchEmployeeById, fetchEmployees } = require('./employee');
const { fetchProjectById, fetchProjects } = require('./project');
const { fetchAssetById, fetchAssets } = require('./asset');
const { fetchCubicalById, fetchCubicals } = require('./cubical');
const { fetchRoomById, fetchRooms } = require('./room');
const { fetchDepartmentById, fetchDepartments } = require('./department');
const { fetchReleaseById, fetchReleases } = require('./release');
const { fetchProductById, fetchProducts } = require('./product');
const { fetchOfficeById, fetchOffices } = require('./office');
const { fetchCompanyById, fetchCompanies } = require('./company');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Root query comprising all queries.',
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
        rooms: fetchRooms(),
        department: fetchDepartmentById(),
        departments: fetchDepartments(),
        release: fetchReleaseById(),
        releases: fetchReleases(),
        product: fetchProductById(),
        products: fetchProducts(),
        office: fetchOfficeById(),
        offices: fetchOffices(),
        company: fetchCompanyById(),
        companies: fetchCompanies()
    }
});

module.exports = { RootQuery };