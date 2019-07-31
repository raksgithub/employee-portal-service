const { GraphQLScalarType } = require('graphql');
const moment = require('moment');

const DateType = new GraphQLScalarType({
    name: 'Date',
    description: "This is a Date type",
    parseValue(value) {
        const parsedDate = moment(value).format('DD/MM/YYYY');
        return parsedDate;
    },
    serialize(value) {
        console.log('Value:', value);
        return moment(value);
    }
});

module.exports = { DateType };