const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
require('./db');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});