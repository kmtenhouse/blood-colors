"use strict";
const Tier = require("../../database/schema/tier");
const baseTiers = require("./utils/default-tiers");
const Promise = require("bluebird");

module.exports = {
    findOneById: function (id) {
        return Tier.findById(id).populate('displayColor');
    },
    findOneByUserAndId: function (id, userId) {
        return Tier.findOne({ _id: id, user: userId }).populate('displayColor').populate('colors');
    },
    findAllByUser: function (userId) {
        return Tier.find({ user: userId }).sort([['order', 'ascending']]).populate("displayColor").populate('colors');
    },
    create: function (obj) {
        return Tier.create(obj);
    },
    createDefaultsForUser: function (userId) {
        return new Promise(async (resolve, reject) => {
            try {
                //now, create each of the relevant Tiers (and map the new user's id to each one)
                const newTierSet = baseTiers.map(tier => {
                    const newTier = Object.assign({}, tier);
                    newTier.user = userId;
                    return newTier;
                });
                const finishedTiers= await Tier.insertMany(newTierSet);
                resolve(finishedTiers);
            }
            catch(err) {
                reject(err);
            }
        });
    },
    deleteOne: function (id, userId) {
        return Tier.findOneAndDelete({ _id: id, user: userId });
    }
};