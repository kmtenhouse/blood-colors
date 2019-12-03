"use strict";
const User = require("../../database/schema/user");

module.exports = {
    findOneById: function(id) {
        return User.findById(id);
    },
    findOneByGoogleId: function(googleIdToSearch) {
        return User.findOne({ googleId: googleIdToSearch});
    },
    create: function(userObj) {
        return User.create(userObj);
    }

};