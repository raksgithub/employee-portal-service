const mongoose = require('mongoose');
const dbuser = 'dbuser1';
const dbPassword = 'DatabaseUser1';
const mongo_uri = `mongodb://${dbuser}:${dbPassword}@ds231740.mlab.com:31740/employee-portal-service-db`;
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

module.exports = connection;