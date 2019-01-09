const cors = require('cors');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var validator = require('express-validator');
var passport = require('passport');
require('./controllers/passport');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
const graphqlHTTP = require("express-graphql")
var schema = require("./GraphQLSchema/schema");
//app.use(cors({ origin: 'http://13.52.25.154:3000', credentials: true }));
var mysql = require('mysql');
let fs = require("fs");
const multer = require("multer")
var kafka = require('./kafka/client')

const bcrypt = require('bcrypt');
const saltRounds = 10;
var LocalStrategy = require("passport-local").Strategy;


const jwt = require("jsonwebtoken");

app.use(passport.initialize());
app.use(passport.session());
//method to serialize user for storage
passport.serializeUser(function(username, done) {
    done(null, username);
});

passport.deserializeUser(function(user, done) {
  User.findById(user.id, function(err, user) {
    if(err) {
      console.error('There was an error accessing the records of' +
      ' user with id: ' + id);
      return console.log(err.message);
    }
    return done(null, user);
  })
});

const TravelerLoginSignUp = require('./controllers/TravelerLoginSignUp');
const OwnerLoginSignUp = require('./controllers/OwnerLoginSignUp');
const PlacesSearch = require('./controllers/PlacesSearch');
const UserProfile = require('./controllers/UserProfile');
const Property = require('./controllers/Property');
const TravelerDashboard = require('./controllers/TravelerDashboard')
const OwnerDashboard = require('./controllers/OwnerDashboard')
const Messages = require('./controllers/Messages');

app.use(session({
    secret              : 'shim!^^#&&@is@**#*(awesome',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

app.use(bodyParser.json());

var placename= '';
var	startdate_user = '';
var enddate_user  = '';
var adultlist = 0;
var childlist = 0;
var Max_ID = -1;

var con = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "Audigger",
  database: "HomeAway"
});


app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    //res.setHeader('Access-Control-Allow-Origin', 'http://13.52.25.154:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
app.listen(4004, () => {
  console.log("GraphQL server started on port 4004");
});
