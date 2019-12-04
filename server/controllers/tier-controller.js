const Tier = require("../../database/schema/tier");
const Color = require("../../database/schema/color");
const getContrastColor = require("../services/utils/hex-conversion").getContrastColor;

module.exports = {
    findOneById: async function (req, res) {
        try {
            const result = await Tier.findById({ _id: req.params.id }).populate("displayColor").populate("colors");
            return res.status(200).json(result);
        } catch (err) {
            return res.sendStatus(500);
        }
    },
    findAll: async function (req, res) {
        try {
            const results = await Tier.find({}).sort([['order', 'ascending']]).populate("displayColor");
            return res.status(200).json(results);

        } catch (err) {
            return res.sendStatus(500);
        }
    },
    findAllWithColors: async function (req, res) {
        try {
            const results = await Tier.find({}).sort([['order', 'ascending']]).populate("displayColor").populate("colors");
            return res.status(200).json(results);

        } catch (err) {
            return res.sendStatus(500);
        }
    },
    create: async function (req, res) {
        try {
            //IMMEDIATE REJECTIONS:
            //(minimum we need is a hex for the color)
            if (!req.body.hex || /^#?[0-9a-fA-F]{6}$/.test(req.body.hex)===false) {
                return res.status(400).json({ error: "Must provide valid hex! (six digit version)" });
            }
 
           //If there is no valid user id to associate the new color with
            if(!req.user || !req.user._id) {
                return res.status(403).json({ error: "Only authenticated users can create new tiers!"});
            }
 
            //start assembling the new tier:
            const newTier = new Tier();
            newTier.user = req.user._id; 

            //OPTIONS:
            //NAME:
            if (req.body.name === "" || typeof req.body.name === "string") {
                newTier.name = req.body.name;
            } else if (req.body.name && typeof req.body.name !== "string") {
                return res.status(400).json({ error: "Must provide a string for the new name!" });
            }

            //ORDER
            //you may also provide an integer to order the tiers 
            if (req.body.order || req.body.order===0) {
                if (Number.isNaN(parseFloat(req.body.order))) {
                    return res.status(400).json({ error: "Order must be a number!" });
                }
                newTier.order = parseFloat(req.body.order);
            }

            //TO-DO: optionally let you create a tier with an existing color to reference

            //CREATION:
            //Start by creating the color object for the tier's base color:
            const newColorName = (newTier.hasOwnProperty("name") ? newTierConfig.name.charAt(0).toUpperCase() + newTier.name.slice(1).toLowerCase() : "");
            const newColorHex = (/^#{1}/.test(req.body.hex) ? req.body.hex : "#" + req.body.hex) //make sure we always prefix the hex with a #
            const newColorContrast = "#" + getContrastColor(newColorHex);
            const newColor = await Color.create({ name: `${newColorName} Tier - Base Color`, hex: newColorHex, contrastColor: newColorContrast });
            newTier.displayColor = newColor._id;

            //Finally, save the tier
            await newTier.save();
            return res.status(200).json(newTier);

        } catch (err) {
            console.log(err);
            return res.sendStatus(500);
        }
    },
    updateOneById: async function (req, res) {
        try {
            //AUTO REJECT:
            //1) If the id of the path doesn't match the id of the object
            if (req.body._id !== req.params.id) {
                return res.status(400).json({ error: "Id mismatch between URI and request body" })
            }

            //Now, get the item we want to update so we can make the appropriate changes:
            let tierToUpdate = await Tier.findById(req.body._id);

            //Make sure this tier does exist before modifying it >.>
            if (!tierToUpdate) {
                return res.sendStatus(404);
            }

            //POSSIBLE FIELDS TO UPDATE:
            //NAME 
            if (req.body.name === "" || typeof req.body.name === "string") {
                tierToUpdate.name = req.body.name;
            } else if (req.body.name && typeof req.body.name !== "string") {
                return res.status(400).json({ error: "Must provide a string for the new name!" });
            }

            //Order:
            if (req.body.order) {
                if (Number.isNaN(parseFloat(req.body.order))) {
                    return res.status(400).json({ error: "Must provide a valid number for the order!" });
                }
                tierToUpdate.order = parseFloat(req.body.order);
            }

            await tierToUpdate.save();
            return res.status(200).json(tierToUpdate); //TO-DO: Figure out why populate isn't working
        }
        catch (err) {
            return res.sendStatus(500);
        }
    },
    delete: async function (req, res) {
        try {
            //attempt to delete the item
            const result = await Tier.deleteOne({ _id: req.params.id });
            if (!result || result.deletedCount === 0) {
                return res.sendStatus(404);
            }

            return res.sendStatus(204);
        }
        catch (err) {
            return res.sendStatus(500);
        }
    }
}