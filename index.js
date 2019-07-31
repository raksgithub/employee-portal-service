const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const schema = require('./schema');
const session = require('express-session');
const uuidv4 = require('node-uuid');
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
    catch (err) {
        next();
    }
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Session Middleware
app.use(session({
    genid: req => {
        // console.log('Inside the session middleware');
        // console.log('SessionId:', req.sessionID);
        return uuidv4();
    },
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

// GraphQL Middleware
app.use('/graphql', checkToken, graphqlHTTP(req => ({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
    context: { userId: req.userId }
})));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});