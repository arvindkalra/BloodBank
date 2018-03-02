const express = require('express');
const app = express();

const PORT = 4000 || process.env.PORT;
const db_connect = require('./database/connect');
const add = require('./database/add.js');

app.use('/add', add);

app.listen(PORT, () => {
    db_connect.connect(function (){
        console.log("Serving on http://localhost:" + PORT);
    });
});