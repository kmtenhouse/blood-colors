
const Color = require("../../database/schema/color");
const getContrastColor = require("../services/utils/hex-conversion").getContrastColor;

module.exports = {

    findAll: function () {
        return Color.find({});
    },

    findOneById: function (colorId) {
        return Color.findById({ _id: colorId });
    },

    createOne: function (colorObj) {
        console.log(colorObj);
        return new Promise((resolve, reject) => {
            //Minimum info you must provide is the hex!
            if (!colorObj || !colorObj.hex || /^#?[0-9a-fA-F]{6}$/.test(colorObj.hex) === false) {
                reject(new Error("Must provide valid hex! (six digit version)"))
            }

            //You may optionally provide a name, but that must be a string
            if (colorObj.name) {
                if (typeof (colorObj.name) !== "string") {
                    reject(new Error("Must provide valid name for the color!"));
                }
            } else {
                colorObj.name = "";
            }

            //if we got to this stage, congrats, we have a valid object!  now let's store things reasonably
            //add the # to the hex if it's missing
            colorObj.hex = (/^#{1}/.test(colorObj.hex) ? colorObj.hex : "#" + colorObj.hex);

            //calculate a reasonable contrast color
            try {
                colorObj.contrastColor = "#" + getContrastColor(colorObj.hex);
            } catch (err) {
                reject(new Error("Internal server error"));
            }
            //(To-do)
            //calculate the rgb values

            Color.create({ name: colorObj.name, hex: colorObj.hex, contrastColor: colorObj.contrastColor })
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