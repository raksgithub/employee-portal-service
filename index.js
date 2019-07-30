const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const schema = require('./schema');
require('dotenv').config();
require('./db');
const { getUserId } = require('./jwt');

const app = express();

// Token checking middleware 
const checkToken = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        const userId = await getUserId(token);
        req.userId = userId;
        next();
    }
    catch(err) {
        next();
    }
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use('/graphql', checkToken, graphqlHTTP(req => ({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
    context: { userId: req.userId }
})));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});