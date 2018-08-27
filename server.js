const express = require("express");
const bodyParser = require("body-parser");
const env = require('dotenv').config();

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

app.use(express.static("client/build"));

const routes = require("./routes");

app.use(routes);

models.sequelize.sync().then(function () {
	app.listen(PORT, function() {
      	console.log("App now listening at localhost:" + PORT);
  	});
});