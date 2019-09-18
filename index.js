"use strict";

const server = require("./server")(),
  database = require("./database")(),
  config = require("./config");

database.connect(config);
server.create(config);
server.start();