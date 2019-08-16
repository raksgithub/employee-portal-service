import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './src/schema';
import session from 'express-session';
import uuidv4 from 'node-uuid';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import('./src/db');
import { getUserId } from './src/jwt';

const app = express();

// Token veryfying middleware 
const verifyToken = async (req, res, next) => {
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

// Chross Origin Resource Sharing (CORS) Middleware
app.use(cors());

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

// GraphQL Apollo Server
const server = new ApolloServer({
    schema,
    context: ({req, res}) => ({
        userId: req.userId
    })
});

// Make use of verifyToken middleware for authentication token verifying
app.use(verifyToken);

// Binding an existing Express App to Apollo Server 
// Apollo Server plays as a middleware to Express App
server.applyMiddleware({ app });

const port = process.env.PORT || 5000;

// Starting the server bootstrapped with Express + Apollo Server
app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}${server.graphqlPath}`);
});