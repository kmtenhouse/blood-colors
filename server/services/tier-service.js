const Tier = require("../../database/schema/Tier");

module.exports = {

    findAll: function () {
        return Tier.find({});
    },

    findOneById: function(tierId) {
        return Tier.findById({_id: tierId});
    },

    createOne: function (tierObj) {
        return new Promise((resolve, reject) => {
            if (!tierObj || !tierObj.hasOwnProperty("name") || typeof (tierObj.name) !== "string" || tierObj.name === "") {
                reject(new Error("Must provide valid name!"))
            }

            Tier.create({ name: tierObj.name }) 
                .then(result => resolve(result))
                .catch(err => reject(err));
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