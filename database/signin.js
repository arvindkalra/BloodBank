const router = require('express').Router();
const bodyParser = require('body-parser');
let db = undefined;

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.post('/', function (req, res) {
    console.log('*****************');
    console.log("POST /signin");
    console.log(req.body);

    let email = req.body.email;
    let password = req.body.password;

    if(db === undefined){
        let connection = require('./connect.js');
        db = connection.obj;
    }

    db.collection('users').findOne({email : email}, function (err, result1) {
        if(err) throw err;
        if(result1 === null){

            res.send({isDone : false, error : "Email is Incorrect..."});
            console.log('*****************');

        }else{

            db.collection('users').findOne({email : email, password : password}, function (err, result2) {
                if(err) throw err;
                if(result2 === null){

                    res.send({isDone : false, error : "Password is Incorrect..."});
                    console.log('*****************');

                }else{

                    // TODO Render Page After SignIn From Here For Now....
                    res.send({isDone : true});
                    console.log('*****************');

                }
            });
        }
    });
});

modules.exports = router;