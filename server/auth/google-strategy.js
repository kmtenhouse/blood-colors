"use strict";
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../services/userService");

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
        //find the first verified email
        if(!Array.isArray(profile.emails) || profile.emails.length === 0) {
          throw new Error("No emails received from google!");
        }

        //find the first verified email
        const verifiedEmails = profile.emails.filter(email => email.verified);
        if(verifiedEmails.length===0 || !verifiedEmails[0].value) {
          throw new Error("No verified emails received from google!");
        }

        const currentUser = await User.findOrCreateViaEmail({ googleId: profile.id, email: verifiedEmails[0].value });
        done(null, currentUser);
      }
      catch(err) {
        done(err, null);
      }
    }
  );

  return strategy;
}