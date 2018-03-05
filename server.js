const express = require('express');
const app = express();

const PORT = 4000 || process.env.PORT;

// Exported JS Files
const db_connect = require('./database/connect');
const add = require('./database/add.js');
const get = require('./database/get.js');

// Passport.js  Requirements
const passport = require('passport');
const passportLocal = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const LocalStrategy = passportLocal.Strategy;

let db = undefined;

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(session({secret : "keyboard cat"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

passport.use(new LocalStrategy(function (username, password, done) {

    if(db === undefined){
        let connection = require('./database/connect.js');
        db = connection.obj;
    }

    db.collection("users").findOne({email: username}, function (err, result) {
        if(err){throw err}
        console.log(result);
        if(result == null){
            return done(null, false);
        }else{
            if(result.password != password){
                return done(null, false);
            }else{
                return done(null, result.hash);
            }
        }
    });
}));

app.post('/login', passport.authenticate('local', { successRedirect: '/done',
    failureRedirect: '/notdone'})
);

passport.serializeUser(function(id, done) {
    done(null, id);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

app.get('/notdone', function (req, res) {
    res.send({isDone : false});
});

app.get('/done', function (req, res) {
    res.send({isDone : true, hash : req.user});
});

app.get('/logout', function(req, res){
    console.log("Do Logout");
    req.logout();
    res.send(true);
});

function checkUser(req, res, next) {
    console.log("Check"+ req.user);
    if(req.user){
        console.log("Allowed");
        next();
    }else{
        console.log("Not Allowed");
        res.send(false);
    }
}

// For Adding New User
app.use('/add', add);

app.use(checkUser);

app.use('/get', get);

app.listen(PORT, () => {
    db_connect.connect(function (){
        console.log("Serving on http://localhost:" + PORT);
    });
});