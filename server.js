const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv').config();

let cookieParser = require('cookie-parser');
let session = require('express-session');
let morgan = require('morgan');

const PORT = process.env.PORT || 3001;

// getting the sequelize models
let models = require('./models');
models.sequelize.sync();

// Creating express app and configuring middleware needed for authentication
let app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.static('client/build'));

// sets up the session for the user
app.use(session({
    key: 'user_cole',
    secret: process.env.REACT_API_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

// clears the cookie
app.use((req, res, next) => {
    if (req.cookies.user_cole && !req.session.user) {
        res.clearCookie('user_cole');        
    }
    next();
});

// getting all the routes
const routes = require('./routes');
app.use(routes);

// 404
app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!')
});

// starting the server
models.sequelize.sync().then(function () {
	app.listen(PORT, function() {
      	console.log('App now listening at localhost:' + PORT);
  	});
});