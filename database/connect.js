const mongodb = require('mongodb').MongoClient;
const config = require('../config.json');
const db = config.database;
const url = 'mongodb://localhost:27017';

module.exports = {
    connect : function(callback) {
        let self = this;
        mongodb.connect(url, (err, database) => {
           if(err) throw err;
           console.log("Connected to Database = " + db.dbname);
           self.obj = database.db(db.dbname);
           callback();
        });
    }
};