import mongoose from 'mongoose';
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const mongo_uri = `mongodb://${dbUser}:${dbPassword}@ds231740.mlab.com:31740/employee-portal-service-db`;
const connection = mongoose.connect(mongo_uri, {
    // For ignoring deprecation warnings by NodeJS driver, set these flags.
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.connection.once('open', () => {
    console.log('DB connection established.');
});

mongoose.connection.on('error', err => {
    console.log('Error has occured', err);
});

export default connection;