const { GraphQLScalarType } = require('graphql');
const moment = require('moment');

const DateType = new GraphQLScalarType({
    name: 'Date',
    description: "This is a Date type",
    parseValue(value) {
        const parsedDate = moment(value).format('DD/MM/YYYY');
        console.log('ParsedDate:', parsedDate);
        return parsedDate;
    },
    serialize(value) {
        return value.getTime();
    },
    // parseLiteral(ast) {
    //     if (ast.kind === Kind.INT) {
    //         return parseInt(ast.value, 10); // ast value is always in string format
    //     }
    //     return null;
    // }
});

module.exports = { DateType };