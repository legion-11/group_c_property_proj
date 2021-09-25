const mongodb = require("mongodb")
const dotenv = require("dotenv")
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

dotenv.config()
const MongoClient = mongodb.MongoClient
const url = process.env.ATLAS_URI

let _db;
let _sessionStore = new MongoDBStore({
    uri: url,
    databaseName: 'propertyDB',
    collection: 'mySessions'
});

// Catch errors
_sessionStore.on('error', (error) => {
    console.log(error);
});

const mongoConnect = async () => {
    await MongoClient.connect(
        url,
        {maxPoolSize:50, wtimeoutMS:2500, useNewUrlParser:true}
    )
        .then(client => {
            // await RestaurantsDAO.injectDB(client)
            // await ReviewsDAO.injectDB(client)
            _db = client.db('propertyDB');
        })
        .catch(error => {
            console.log(error);
            throw new Error('DB connection failed...');
        });
}


const getDB = () => {
    if (_db) {
        return _db;
    } else {
        throw new Error('DB connect failed');
    }
}

const getSessionStore = () => {
    if (_sessionStore) {
        return _sessionStore;
    } else {
        throw new Error('Session store connection failed');
    }
}

module.exports = {getDB, mongoConnect, getSessionStore};