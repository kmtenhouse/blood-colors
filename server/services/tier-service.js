/* Require the schema for the tier */
const Tier = require("../../database/schema/tier");

/* Require color service */
const colorSvc = require("./color-service");

module.exports = {

    findAll: function () {
        return Tier.find({});
    },

    findOneById: function (tierId) {
        return Tier.findById({ _id: tierId });
    },

    createOne: function (tierObj) {
        return new Promise((resolve, reject) => {
            //minimum info we need is a hex for the color we want to make core
            if (!tierObj || !tierObj.hex) {
                reject(new Error("Must provide valid hex! (six digit version)"))
            }

            //tiers can also have human-readable names  - while this is highly recommended, it is not strictly required
            if (tierObj.name) {
                if (typeof (tierObj.name) !== "string") { //if you do provide the name, it has to be a string tho
                    reject(new Error("Must provide valid name for the tier!"));
                }
            } else {
                tierObj.name = "";
            }

            //now, attempt to create a color with the hex we got
            //if that fails, we reject
            colorSvc.createOne({ name: tierObj.name, hex: tierObj.hex })
                .then(result=>resolve(result))
                .catch(err=>reject(err));
            /*            Tier.create({ name: tierObj.name })
                           .then(result => resolve(result))
                           .catch(err => reject(err)); */
        });

    },

    deleteOne: function (id) {
        return new Promise((resolve, reject) => {
            //check if we're receiving a valid mongo id
            var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
            if (!checkForHexRegExp.test(id)) {
                reject(new Error("Must be a valid id format"));
            }
            Tier.deleteOne({ _id: id })
                .then(result => {
                    if (!result || result.deletedCount === 0) {
                        reject(new Error("Not Found"))
                    } else {
                        resolve(result);
                    }
                })
                .catch(err => reject(err));
        })

    }
}