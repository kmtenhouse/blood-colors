
const Color = require("../../database/schema/color");
const getContrastColor = require("../services/utils/hex-conversion").getContrastColor;

module.exports = {

    findAll: function () {
        return Color.find({});
    },

    findOneById: function(colorId) {
        return Color.findById({_id: colorId});
    },

    createOne: function (colorObj) {
        console.log(colorObj);
        return new Promise((resolve, reject) => {
            if (!colorObj || !colorObj.hasOwnProperty("name") || typeof (colorObj.name) !== "string" || colorObj.name === "") {
                reject(new Error("Must provide valid name!"))
            }

            if (!colorObj || !colorObj.hasOwnProperty("hex") || /^#?[0-9a-fA-F]{6}$/.test(colorObj.hex) === false) {
                reject(new Error("Must provide valid hex! (Six digit version)"))
            }

            //congrats, we have a valid object!  now let's store things reasonably
            //add the # if it's missing
            colorObj.hex = (/^#{1}/.test(colorObj.hex) ? colorObj.hex : "#" + colorObj.hex);

            //calculate the contrast color
            try {
                colorObj.contrastColor = "#" + getContrastColor(colorObj.hex);
            } catch(err) {
               console.log(err);
               reject(new Error("An internal error occurred"));
            }

            //calculate the rgb values

            Color.create(colorObj)
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
            Color.deleteOne({ _id: id })
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