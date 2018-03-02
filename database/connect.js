const mongodb = require('mongodb').MongoClient;
const config = require('../config.json');
const db = config.database;
const url = 'mongodb://'+db.username+':'+db.password+'@'+db.hostname+':'+db.port+'/'+db.dbname;

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