const {getDB} = require("../config/database");

const db = getDB();
const userCollection = "users";

const findByUserName = (username) => {
    return db.collection(userCollection)
        .findOne({ username: username })
};

const findByUserId = (id) => {
    return db.collection(userCollection)
        .findOne({ _id: id })
};

const insertUser = (user) => {
    return db.collection(userCollection)
        .insertOne(user)
};



module.exports = {findByUserName, findByUserId, insertUser};