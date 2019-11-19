"use strict";

const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  cors = require("cors"),
  exphbs = require("express-handlebars");

module.exports = function () {
  let app = express(),
    create,
    start;

  create = function (config) {
    let routes = require("./routes");

    // Server settings
    app.set("env", config.env);
    app.set("port", config.port);
    app.set("hostname", config.hostname);
    app.set("staticDir", config.staticDir);

    // Returns middleware that parses json
    app.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
    app.use(bodyParser.json());

    //Set up static files
    app.use(express.static(app.get("staticDir")));

    //Set our view engine as handlebars, and the default layout as main
    app.engine("handlebars", exphbs({ defaultLayout: "main" }));
    app.set("view engine", "handlebars");

    //Logging (for dev)
    app.use(morgan("dev"));

    // Set up CORS here
    app.use(cors());
    // Set up routes
    // ====== Routing ======
    app.use(routes);
  };

  start = function () {
    let hostname = app.get("hostname"),
      port = app.get("port");

    app.listen(port, function () {
      console.log(`App listening on http://${hostname}:${port}`);
    });
  };

  return {
    create: create,
    start: start
  };
};
