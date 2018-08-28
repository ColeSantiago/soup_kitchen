const express = require("express");
const bodyParser = require("body-parser");
const env = require('dotenv').config();

let cookieParser = require('cookie-parser');
let session = require('express-session');
let morgan = require('morgan');
// let User = require('./models/user');

const PORT = process.env.PORT || 3001;

let models = require('./models');
models.sequelize.sync();

// Creating express app and configuring middleware needed for authentication
let app = express();

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.static("client/build"));

app.use(session({
    key: 'user_cole',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    if (req.cookies.user_cole && !req.session.user) {
        res.clearCookie('user_cole');        
    }
    next();
});

const routes = require("./routes");

app.use(routes);

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

models.sequelize.sync().then(function () {
	app.listen(PORT, function() {
      	console.log("App now listening at localhost:" + PORT);
  	});
});