const router = require('express').Router();
const bodyParser = require('body-parser');
let db = undefined;

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.post('/new', function (req, res) {
    console.log('*****************');
    console.log("POST /add/new");
    console.log(req.body);
    let name = req.body.name;
    let phone_number = req.body.phone_number;
    let blood_group = req.body.blood_group;
    let address = req.body.address;
    let pin_code = req.body.pin_code;
    let email = req.body.email;
    if(db === undefined){
        let connection = require('./connect.js');
        db = connection.obj;
    }
    let objtba = {
        name : name,
        phone_number : phone_number,
        blood_group : blood_group,
        address : address,
        email : email,
        last_donated : null
    };
    db.collection(pin_code).insertOne(objtba, function (err, result) {
        if(err) throw err;
        res.send({
            name : name,
            isDone : true
        });
        console.log('*****************\n\n');
    });
});

module.exports = router;