const express = require('express');
const app = express();
const PORT = 4000 || process.env.PORT;



app.listen(PORT, () => {
    console.log("Serving on http://localhost:" + PORT);
});