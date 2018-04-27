const mongodb = require('mongodb').MongoClient;
const db = "BloodBank";
const url = 'mongodb://localhost:27017';

module.exports = {
    connect : function(callback) {
        let self = this;
        mongodb.connect(url, (err, database) => {
           if(err) throw err;
           console.log("Connected to Database = " + db);
           self.obj = database.db(db);
           callback();
        });
    }
};