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