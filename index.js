const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
require('dotenv').config();
require('./db');
const { getUserId } = require('./jwt');

const app = express();

// Token checking middleware 
const checkToken = async (req, res, next) => {
    const token = req.headers['Authorization'];
    console.log('Token:', token);
    if (!token) {
        req.userId = 123;
    } else {
        const userId = await getUserId(token);
        req.userId = userId;
    }
    next();
}

app.use('/graphql', checkToken, graphqlHTTP(req => ({
    schema,
    graphiql: true,
    context: { userId: req.userId }
})));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});