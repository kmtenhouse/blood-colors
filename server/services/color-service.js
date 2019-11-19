const Color = require("../../database/schema/color");
const utils = require("../services/utils/hex-conversion");

module.exports = {
    findOneById: function (id) {
        return Color.findById({ _id: id });
    },
    findAll: function () {
        return Color.find({});
    },
    findColorsWithNoTier: function () {
        return Color.find({ tier: { $exists: false } });
    },
    findColorsWithTier: function () {
        return Color.find({ tier: { $exists: true } });
    },
    updateOne: function (colorObj) {
        return new Promise(async (resolve, reject) => {
            try {
                //First, find the item we are updating:
                let colorToUpdate = await Color.findById(colorObj._id);

                //Now, make sure the item exists before we try updating!
                if (!colorToUpdate) {
                    const errMsg = new Error("Color not found!")
                    errMsg.statusCode = 404;
                    reject(errMsg);
                }

                //Allowable properties to update:
                //NAME 
                if (colorObj.name === "" || typeof colorObj.name === "string") {
                    colorToUpdate.name = colorObj.name;
                } else if (colorObj.name && typeof colorObj.name !== "string") {
                    const errMsg = new Error("Must provide a string for the new name!")
                    errMsg.statusCode = 400;
                    reject(errMsg);
                }

                //Finally, save the updated color:
                await colorToUpdate.save();
                resolve(colorToUpdate);
            }
            catch (err) {
                reject(err);
            }
        });
    },
    create: function (newColorObj) {
        return new Promise(async (resolve, reject) => {
            try {
                //Immediate rejections:
                //1) User does not provide at least a hex (#000000 or 000000 format) for the color
                if (!newColorObj || !newColorObj.hex || /^#?[0-9a-fA-F]{6}$/.test(newColorObj.hex) === false) {
                    const errMsg = new Error("Must provide valid hex value for the color! (six digit version)");
                    errMsg.statusCode = 400;
                    reject(errMsg);
                }

                //if we got to this stage, congrats, we have a valid hex! 
                //add the # to the hex if it's missing
                const hex = (/^#{1}/.test(newColorObj.hex) ? newColorObj.hex : "#" + newColorObj.hex);

                //calculate a reasonable contrast color
                const contrastColor = "#" + utils.getContrastColor(hex);

                //Create a new color
                const newColor = new Color({ hex, contrastColor });

                //OPTIONAL ITEMS
                //You may optionally provide a name, but that must be a string
                if (newColorObj.name) {
                    if (typeof newColorObj.name !== "string") {
                        const errMsg = new Error("Must provide valid name for the color!");
                        errMsg.statusCode = 400;
                        reject(errMsg);
                    }
                    newColor.name = newColorObj.name;
                }

                //Finally, save the document to the db and return the results
                const result = await newColor.save();
                resolve(result);
            }
            catch (err) {
                reject(err);
            }
        });
    },
    delete: function (id) {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteAttempt = await Color.deleteOne({ _id: id });
                if (!deleteAttempt || deleteAttempt.deletedCount === 0) {
                    const errMsg = new Error("Color not found!");
                    errMsg.statusCode = 404;
                    reject(errMsg);
                }

                //successfully deleted!  
                resolve(true);
            }
            catch (err) {
                reject(err);
            }
        });
    }
}