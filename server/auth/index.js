"use strict";

const fs = require("fs"),
    path = require("path");

const indexFile = path.basename(module.filename);
const User = require("../services/userService");

module.exports = function () {
    const passport = require("passport");

    const initialize = function (config) {
        try {
            fs
                .readdirSync(__dirname)
                .filter(function (file) {
                    return (file.indexOf('.') !== 0) && (file !== indexFile) && (file.slice(-3) === '.js');
                })
                .forEach(function (file) {
                    const fullPath = path.join(__dirname, file);
                    const currentStrategy = require(fullPath)(config);
                    passport.use(currentStrategy);
                });
        }
        catch (err) {
            err.message = "Auth initialization failed! " + err.message;
            throw err;
        }

        // Set up our serialization options for passport
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(async function (id, done) {
            try {
                const currentUser = await User.findById(id);
                if(!currentUser) {
                    throw new Error("User not found");
                }
                done(null, currentUser);
            } catch (err) {
                console.log("Caught error!");
                return done(err, null);
            }
        });

        return passport;
    }

    return { initialize };
}

