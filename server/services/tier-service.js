/* Require the schema for the tier */
const Tier = require("../../database/schema/tier");

/* Require color service */
const colorSvc = require("./color-service");

module.exports = {

    findAll: function () {
        return Tier.find({}).sort([['order', 'ascending']]).populate("displayColor");
    },

    findOneById: function (tierId) {
        return Tier.findById({ _id: tierId }).populate("displayColor");
    },

    createOne: function (tierObj) {
        console.log(tierObj);
        return new Promise(async (resolve, reject) => {
            //minimum info we need is a hex for the color we want to make core, and also a name
            if (!tierObj || !tierObj.hex) {
                reject(new Error("Must provide valid hex! (six digit version)"))
            }

            if (!tierObj.name || typeof tierObj.name !== "string") {
                reject(new Error("Must provide a name for the tier!"));
            }

            //you may also optionally provide an integer to order the tiers 
            if (tierObj.order) {
                console.log(tierObj.order);
                if (Number.isNaN(parseFloat(tierObj.order))) {
                    reject(new Error("Order must be a number!"));
                }
                tierObj.order = parseFloat(tierObj.order);
            } else {
                tierObj.order = 0;
            }

            //now, attempt to create a color with the hex we got
            //if that fails, we reject
            try {
                const newColorName = tierObj.name.charAt(0).toUpperCase() + tierObj.name.slice(1).toLowerCase();
                const newColor = await colorSvc.createOne({ name: `${newColorName} Tier - Base Color`, hex: tierObj.hex });
                const idToAssoc = newColor._id;

                const newTier = await Tier.create({ name: tierObj.name, displayColor: idToAssoc, order: tierObj.order });
                resolve(newTier.populate('displayColor').execPopulate());

            } catch (err) {
                reject(err);
            }
        });

    },

    updateOneById: function (updateObj) {
        return new Promise(async (resolve, reject) => {
            //check if we're receiving a valid mongo id
            try {
                if (!updateObj._id || /^[0-9a-fA-F]{24}$/.test(updateObj._id) === false) {
                    reject(new Error("Must provide a valid id to update!"));
                }

                //the only things we can update right now are the name
                if (!updateObj.name || typeof updateObj.name !== "string") {
                    reject(new Error("Must provide a string for the new name!"));
                }

                let tierToUpdate = await Tier.findById(updateObj._id);
                tierToUpdate.name = updateObj.name;
                await tierToUpdate.save();
                resolve(tierToUpdate.populate("displayColor").execPopulate());
            }
            catch (err) {
                reject(err);
            }
        })
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