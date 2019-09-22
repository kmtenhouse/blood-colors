"use strict";

const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  cors = require("cors");

module.exports = function() {
  let server = express(),
    create,
    start;

  create = function(config) {
    let routes = require("./routes");

    // Server settings
    server.set("env", config.env);
    server.set("port", config.port);
    server.set("hostname", config.hostname);
    server.set("staticDir", config.staticDir);

    // Returns middleware that parses json
    server.use(
      bodyParser.urlencoded({
        extended: false
      })
    );
    server.use(bodyParser.json());

    //Set up static files
    server.use(express.static(server.get(staticDir)));

    //Logging (for dev)
    server.use(morgan("dev"));

    // Set up CORS here
    server.use(cors());
    // Set up routes
    // ====== Routing ======
    server.use(routes);
  };

  start = function() {
    let hostname = server.get("hostname"),
      port = server.get("port");

    server.listen(port, function() {
      console.log(`App listening on http://${hostname}:${port}`);
    });
  };

  return {
    create: create,
    start: start
  };
};
