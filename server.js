const express = require('express');
const app = express();
const PORT = 4000 || process.env.PORT;
const db_connect = require('./database/connect');


app.listen(PORT, () => {
    db_connect.connect(() => {
        console.log("Serving on http://localhost:" + PORT);
    });
});