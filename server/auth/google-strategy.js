"use strict";
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../services/user-service");

module.exports = function (config) {
  if (!config.google_client_id || !config.google_client_secret) {
    throw new Error("Must provide client id and secret for Google!");
  }

  const strategy = new GoogleStrategy({
    clientID: config.google_client_id,
    clientSecret: config.google_client_secret,
    callbackURL: "/auth/google/callback"
  },
    async function (accessToken, refreshToken, profile, done) {
      try {
        //first, see if we already have this particular user:
        let currentUser = await User.findOneByGoogleId(profile.id);

        //if the user doesn't already exist, create them!
        if (!currentUser) {
          currentUser = await User.createWithTiers({ googleId: profile.id });
        }
        
        done(null, { _id: currentUser._id });
      }
      catch (err) {
        console.log(err);
        done(null, null);
      }
    }
  );

  return strategy;
}