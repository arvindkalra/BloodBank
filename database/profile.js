const router = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');
let db = undefined;

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.post('/', function (req, res) {
   let hash = req.body.id;
   res.render('SignedIn', {
       ID : hash
   });
   console.log('*****************\n\n');
});

router.post('/request', function (req, res) {

    // TODO Add Blood Request Here

    console.log('*****************\n\n');
});

module.exports = router;