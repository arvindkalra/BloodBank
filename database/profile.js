const router = require('express').Router();
const bodyParser = require('body-parser');
const path = require('path');
let db = undefined;

const hbs = require('hbs');

hbs.registerHelper('checkNull', function (val, options) {
   if(val === null){
        return options.fn(this);
   }
   return options.inverse(this);
});

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
router.use(bodyParser.json());

router.post('/', function (req, res) {
   let hash = req.body.id;

   if(db === undefined){
       let connection = require('./connect.js');
       db = connection.obj;
   }

   db.collection('users').findOne({hash : hash}, function (err, result) {
      if(err) throw err;
      let pin_code = result.pin_code;
      db.collection(pin_code).findOne({hash : hash}, function (err1, data) {
          if(err1) throw err1;
          let name = data.name;
          res.render('profile', {
              name : name,
              phone_number : data.phone_number,
              email : data.email,
              address : data.address,
              blood_group : data.blood_group,
              last_donated : data.last_donated,
              last_requested: data.last_requested
          });
      })
   });

   console.log('*****************\n\n');
});

router.post('/request', function (req, res) {

    // TODO Add Blood Request Here

    console.log('*****************\n\n');
});

module.exports = router;