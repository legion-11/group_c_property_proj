const mongodb = require("mongodb")
const dotenv = require("dotenv")
// import RestaurantsDAO from "./dao/restaurantsDAO.js"
// import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        process.env.ATLAS_URI,
        {
            maxPoolSize:50,
            wtimeoutMS:2500,
            useNewUrlParser:true
        }
    )
        .then(client => {
            // await RestaurantsDAO.injectDB(client)
            // await ReviewsDAO.injectDB(client)
            _db = client.db('property');
            callback();
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

module.exports = {getDB, mongoConnect};