const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    // COMPASS
    //MongoClient.connect('mongodb+srv://uygar:uygareren123@cluster0.sg1tnmy.mongodb.net/')
    // ATLAS

    MongoClient.connect('mongodb+srv://uygar:uygareren123@cluster0.sg1tnmy.mongodb.net/?retryWrites=true&w=majority')
        .then(client => {
            console.log('connected');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}

const getdb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database';
}


exports.mongoConnect = mongoConnect;
exports.getdb = getdb;