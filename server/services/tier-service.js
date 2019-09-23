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
        return new Promise(async (resolve, reject) => {
            //minimum info we need is a hex for the color we want to make core, and also a name
            if (!tierObj || !tierObj.hex) {
                reject(new Error("Must provide valid hex! (six digit version)"))
            }

            if (!tierObj.name || typeof tierObj.name !== "string") {
                reject(new Error("Must provide a name for the tier!"));
            }


            //now, attempt to create a color with the hex we got
            //if that fails, we reject
            try {
                const newColorName = tierObj.name.charAt(0).toUpperCase() + tierObj.name.slice(1).toLowerCase();
                const newColor = await colorSvc.createOne({ name: `${newColorName} Tier - Base Color`, hex: tierObj.hex });
                const idToAssoc = newColor._id;

                const newTier = await Tier.create({ name: tierObj.name, displayColor: idToAssoc });
                resolve(newTier.populate('displayColor').execPopulate());

            } catch (err) {
                reject(err);
            }
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