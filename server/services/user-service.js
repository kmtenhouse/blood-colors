"use strict";
const User = require("../../database/schema/user");
const Tier = require("../services/tier-service");
const Promise = require("bluebird");

module.exports = {
    findOneById: function(id) {
        return User.findById(id);
    },
    findUsersTiersById: function(id) {
        return User.findById(id).populate('tiers');
    },
    findOneByGoogleId: function(googleIdToSearch) {
        return User.findOne({ googleId: googleIdToSearch});
    },
    create: function(userObj) {
        //create a new user and then pre-populate with default hemospectrum tiers
        return User.create(userObj);
    },
    createWithTiers: function(userObj) {
        //create a new user and then pre-populate with default hemospectrum tiers
        return new Promise(async (resolve, reject) => {
            try {
                //first create a new user
                const newUser = new User(userObj);
                //create default tiers for this user
                const newTiers = await Tier.createDefaultsForUser(newUser._id);
                //update the new user to include the tiers we just created...
                const tierIDs = newTiers.map(tier=> tier._id);
                newUser.tiers = tierIDs;
                await newUser.save();
                //and finally, return our fully put-together-user!
                resolve(newUser);
            }
            catch(err) {
                reject(err);
            }
        });
    }

};