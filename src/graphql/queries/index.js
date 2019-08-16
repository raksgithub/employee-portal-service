import { GraphQLObjectType } from 'graphql';
import { fetchUserById, fetchUsers } from './user';
import { fetchEmployeeById, fetchEmployees } from './employee';
import { fetchProjectById, fetchProjects } from './project';
import { fetchAssetById, fetchAssets } from './asset';
import { fetchCubicalById, fetchCubicals } from './cubical';
import { fetchRoomById, fetchRooms } from './room';
import { fetchDepartmentById, fetchDepartments } from './department';
import { fetchReleaseById, fetchReleases } from './release';
import { fetchProductById, fetchProducts } from './product';
import { fetchOfficeById, fetchOffices } from './office';
import { fetchCompanyById, fetchCompanies } from './company';

export default new GraphQLObjectType({
    name: 'QueryType',
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
