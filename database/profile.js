const router = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');
let db = undefined;

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.get('/', function (req, res) {
   let hash = req.query.hash;
   res.render('SignedIn', {
       ID : hash
   })
});

router.post('/request', function (req, res) {
    console.log('*****************');
    console.log("POST /get/request");

    // TODO Add Blood Request Here

    console.log('*****************');
});

module.exports = router;