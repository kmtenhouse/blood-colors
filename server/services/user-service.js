"use strict";
const User = require("../../database/schema/user");
const Tier = require("../../database/schema/tier");
const Promise = require("bluebird");
const baseTiers = require("./utils/default-tiers");

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
                let newUser = await User.create(userObj);

                //now, create each of the relevant Tiers (and map the new user's id to each one)
                const newTierSet = baseTiers.map(tier => {
                    const newTier = Object.assign({}, tier);
                    newTier.user = newUser._id;
                    return newTier;
                });

                const newTiers = await Tier.insertMany(baseTiers);
                //update the new user to include the tiers we just created...
                const tierIDs = newTiers.map(tier=> tier._id);
                console.log(tierIDs);
                newUser.tiers = tierIDs;
                await newUser.save();
                resolve(newUser);
            }
            catch(err) {
                reject(err);
            }
        });
    }

};