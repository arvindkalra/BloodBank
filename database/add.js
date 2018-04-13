const router = require('express').Router();
const bodyParser = require('body-parser');
const CryptoJS = require('crypto-js');
let db = undefined;

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.post('/checkUser', function (req, res) {
    console.log(req.body);
    let email = req.body.email;

    if(db === undefined){
        let connection = require('./connect.js');
        db = connection.obj;
    }
    
    db.collection('users').findOne({email : email}, function (err, result) {
        if(err) throw err;

        if(result == null){
            res.send({present : false});
        }else{
            res.send({present : true});
        }
        console.log('*****************\n\n');

    })
    
});

router.post('/newUser', function (req, res) {
    console.log(req.body);
    let name = req.body.name;
    let phone_number = req.body.phone_number;
    let blood_group = req.body.blood_group;
    let address = req.body.address;
    let pin_code = req.body.pin_code;
    let email = req.body.email;
    let password = req.body.password;
    let hash = CryptoJS.SHA256(name + email + phone_number).toString();
    if(db === undefined){
        let connection = require('./connect.js');
        db = connection.obj;
    }
    let userobjtba = {
        email : email,
        password : password,
        pin_code : pin_code,
        hash : hash
    };
    let objtba = {
        hash : hash,
        name : name,
        phone_number : phone_number,
        blood_group : blood_group,
        address : address,
        email : email,
        last_donated : null,
        last_requested : null
    };
    db.collection('users').insertOne(userobjtba, function (err, result) {
        if(err) throw err;
        db.collection(pin_code).insertOne(objtba, function (err, result) {
            if(err) throw err;
            res.send({
                hash : hash,
                name : name,
                isDone : true
            });
            console.log('*****************\n\n');
        });
    });
});

module.exports = router;