var express = require('express');
// GET method route
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Sequelize = require('sequelize');

var sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    // SQLite only
    storage: 'data/missbohol.sqlite',
    define: {
        timestamps: false // true by default
    },
    logging: false
});


var db = require('./db')(sequelize);




passport.use(new LocalStrategy({
    usernameField: 'j_username',
    passwordField: 'j_password'
    },
    function(username, password, done) {
      var Judge=  db.Judge;
        Judge.findOne({
            where: {
                judgeNo: username,
                password:password
            }
        }).then(function(judge){
            judge.password='';
            done(null,judge);

        }).catch(function(err){
            done(err,false);
        });

    }
));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {

    var Judge=  db.Judge;
    Judge.findById(id).then(function(judge){

        judge.password='';
        done(null,judge);

    }).catch(function(err){
        done(err,false);
    });

});




app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(express.static('static'));

/*
 app.use(session({
 genid: function(req) {
 return require('uuid').v4();
 },
 secret: 'keyboard cat',
 resave: false,
 saveUninitialized: true
 }));
 */


app.use(session({
    store: new FileStore(),
    secret: 'iloveu',
    resave: false,
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());


var api= require('./api')(passport);
var users = require('./users');


app.use('/api', api);



function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else
        res.sendStatus(401);
}



app.use('/api/users',ensureAuthenticated,users);



app.get('/api/public/ping', function (req, res) {
  res.send('OK');
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});