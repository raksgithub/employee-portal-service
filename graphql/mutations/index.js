const { GraphQLObjectType } = require('graphql');
const { createUser, signInUser } = require('./user');
const { createEmployee, addRelationshipToEmployees, assignCubicalToEmployee, assignEmployeeToDepartment } = require('./employee');
const { createProject } = require('./project');
const { createNewAsset, tagEmployeeToAsset } = require('./asset');
const { createRoom } = require('./room');
const { createCubical } = require('./cubical');
const { createDepartment } = require('./department');

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
        createNewAsset: createNewAsset(),
        tagEmployeeToAsset: tagEmployeeToAsset(),
        createRoom: createRoom(),
        createCubical: createCubical(),
        createDepartment: createDepartment()
    }
});

module.exports = { RootMutation };