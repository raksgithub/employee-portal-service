import { GraphQLObjectType } from 'graphql';
import { createUser, signInUser } from './user';
import { 
    createEmployee, 
    addRelationshipToEmployees, 
    assignCubicalToEmployee, 
    assignEmployeeToDepartment,
    addEmployeeGenralInfo 
} from './employee';
import { createProject } from './project';
import { createNewAsset, tagEmployeeToAsset } from './asset';
import { createRoom } from './room';
import { createCubical } from './cubical';
import { createDepartment } from './department';
import { createNewOffice } from './office';
import { createNewRelease, addProductToRelease } from './release';
import { createNewProduct, addSubProductsToProduct } from './product';
import { createNewCompany } from './company';

export default new GraphQLObjectType({
    name: 'MutationType',
    description: 'Root mutation comprising all mutations.',
    fields: {
        createUser: createUser(),
        signInUser: signInUser(),
        createEmployee: createEmployee(),
        createProject: createProject(),
        createRelationShipToEmployees: addRelationshipToEmployees(),
        assignCubicalToEmployee: assignCubicalToEmployee(),
        assignEmployeeToDepartment: assignEmployeeToDepartment(),
        addEmployeeGenralInfo: addEmployeeGenralInfo(),
        createNewAsset: createNewAsset(),
        tagEmployeeToAsset: tagEmployeeToAsset(),
        createRoom: createRoom(),
        createCubical: createCubical(),
        createDepartment: createDepartment(),
        createNewOffice: createNewOffice(),
        createNewRelease: createNewRelease(),
        addProductToRelease: addProductToRelease(),
        createNewProduct: createNewProduct(),
        addSubProductsToProduct: addSubProductsToProduct(),
        createNewCompany: createNewCompany()
    }
});
