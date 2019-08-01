const { GraphQLObjectType } = require('graphql');
const { createUser, signInUser } = require('./user');
const { 
    createEmployee, 
    addRelationshipToEmployees, 
    assignCubicalToEmployee, 
    assignEmployeeToDepartment,
    addEmployeeGenralInfo 
} = require('./employee');
const { createProject } = require('./project');
const { createNewAsset, tagEmployeeToAsset } = require('./asset');
const { createRoom } = require('./room');
const { createCubical } = require('./cubical');
const { createDepartment } = require('./department');
const { createNewOffice } = require('./office');
const { createNewRelease, addProductToRelease } = require('./release');
const { createNewProduct, addSubProductsToProduct } = require('./product');
const { createNewCompany } = require('./company');

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
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

module.exports = { RootMutation };