"use strict";

const mongoose = require("mongoose"),
    bluebird = require("bluebird");
let connect;

module.exports = function () {
    connect = (config) => {
        const { databaseRef } = config;
        // Use bluebird
        mongoose.Promise = bluebird;
        return mongoose.connect(databaseRef, { useNewUrlParser: true });
    }

    return {
        connect: connect
    };
}