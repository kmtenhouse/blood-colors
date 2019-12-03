"use strict";
const User = require("../../database/schema/user");

module.exports = {
    findOneByGoogleId: function(googleIdToSearch) {
        return User.findOne({ googleId: googleIdToSearch});
    },
    create: function(userObj) {
        return User.create(userObj);
    }

};