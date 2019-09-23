const Tier = require("../../database/schema/tier");
const Color = require("../../database/schema/color");
const getContrastColor = require("../services/utils/hex-conversion").getContrastColor;

module.exports = {
    findOneById: async function (req, res) {
        try {
            const result = await Tier.findById({ _id: req.params.id }).populate("displayColor");
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
    create: async function (req, res) {
        //attempt to create a color using the input we received
        //if that fails for any reason, we autoreject
        try {
            //IMMEDIATE REJECTIONS:
            //(minimum we need is a hex for the color, and also a name)
            if (!req.body.hex || /^#?[0-9a-fA-F]{6}$/.test(req.body.hex)) {
                return res.status(400).json({ error: "Must provide valid hex! (six digit version)" });
            }

            if (!req.body.name || typeof req.body.name !== "string") {
                return res.status(400).json({ error: "Must provide a name for the tier!" });
            }

            //start assembling the "create" object
            //REQUIRED:
            //Name for the tier
            const newTierConfig = {
                name: req.body.name,
            };

            //Associated color object for the tier's displayColor
            const newColorName = newTierConfig.name.charAt(0).toUpperCase() + newTierConfig.name.slice(1).toLowerCase();
            const newColorHex = (/^#{1}/.test(req.body.hex) ? req.body.hex : "#" + req.body.hex) //make sure we always prefix the hex with a #
            const newColorContrast = getContrastColor(newColorHex);
            const newColor = await Color.create({ name: `${newColorName} Tier - Base Color`, hex: newColorHex, contrastColor: newColorContrast });
            newTierConfig.displayColor = newColor._id;

            //OPTIONAL:
            //you may provide an integer to order the tiers 
            if (inputObj.order !== 'undefined') {
                if (Number.isNaN(parseFloat(inputObj.order))) {
                    return res.status(400).json({ error: "Order must be a number!" });
                }
                newTierConfig.order = parseFloat(inputObj.order);
            }

            //TO-DO: optionally let you create a tier with an existing color to reference

            //CREATION:
            const newTier = await Tier.create(newTierConfig);
            return res.status(201).json(newTier.populate('displayColor').execPopulate());

        } catch (err) {
            return res.sendStatus(500);
        }
    },
    updateOneById: async function (req, res) {
        //Check that we're trying to update the same item that we are hitting via the route -- don't want any mismatches!
        try {
            //AUTO REJECT:
            //1) If the id of the path doesn't match the id of the object
            if (req.body._id !== req.params.id) {
                return res.status(400).json({ error: "Id mismatch between URI and request body" })
            }

            //2) If there is no valid id to update
            if (!req.body._id || /^[0-9a-fA-F]{24}$/.test(req.body._id) === false) {
                return res.status(400).json({ error: "Must provide a valid id to update!" });
            }

            //Now, get the item we want to update so we can make the appropriate changes:
            let tierToUpdate = await Tier.findById(req.body._id);

            //POSSIBLE FIELDS TO UPDATE:
            //Name:
            if (req.body.name !== "undefined") {
                if (typeof req.body.name !== "string") {
                    return res.status(400).json({ error: "Must provide a string for the new name!" });
                }
                tierToUpdate.name = req.body.name;
            }

            //Order:
            if(req.body.order !== "undefined") {
                if( Number.isNaN(parseFloat(req.body.order))) {
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
            //AUTO REJECT: if an invalid id was provided
            const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");

            if (!checkForHexRegExp.test(req.params.id)) {
                return res.status(400);
            }

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