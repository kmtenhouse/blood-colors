const Color = require("../../database/schema/color");
const utils = require("../services/utils/hex-conversion");

module.exports = {
    findOneById: async function (req, res) {
        try {
            const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
            if (!checkForHexRegExp.test(req.params.id)) {
                return res.sendStatus(400);
            }

            const result = await Color.findById({ _id: req.params.id });
            res.status(200).json(result);
        }
        catch (err) {
            res.sendStatus(500);
        }
    },
    findAll: async function (req, res) {
        try {
            const results = await Color.find({});
            res.status(200).json(results);
        }
        catch (err) {
            res.sendStatus(500);
        }
    },
    updateOneById: async function (req, res) { //req.body._id && req.params.id
        try {
            //Immediate rejections:
            //1) If an invalid id was provided
            if (!req.body._id || /^[0-9a-fA-F]{24}$/.test(req.body._id) === false) {
                return res.status(400).json({ error: "Must provide a valid id to update!" });
            }

            //2) If the id in the payload doesn't match the id in the url
            if (req.body._id !== req.params.id) {
                return res.status(400).json({ error: "Mismatch between URI and id in body!" });
            }

            //Next, find the item we are updating:
            let colorToUpdate = await Color.findById(req.body._id);

            //Now, make sure the item exists before we try updating!
            if(!colorToUpdate) {
                return res.status(404).json({ error: "Color not found!"});
            }

            //Allowable properties to update:
            //NAME 
            if (req.body.name === "" || typeof req.body.name === "string") {
                colorToUpdate.name = req.body.name;
            } else if (req.body.name && typeof req.body.name !== "string") {
                return res.status(400).json({ error: "Must provide a string for the new name!" });
            }

            //Finally, save the updated color:
            await colorToUpdate.save();
            res.status(200).json(colorToUpdate);
        }
        catch (err) {
            res.sendStatus(500);
        }
    },
    create: async function (req, res) { //req.body
        try {
            //Immediate rejections:
            //1) User does not provide at least a hex (#000000 or 000000 format) for the color
            if (!req.body || !req.body.hex || /^#?[0-9a-fA-F]{6}$/.test(req.body.hex) === false) {
                return res.status(400).json({ error: "Must provide valid hex value for the color! (six digit version)" });
            }

            //if we got to this stage, congrats, we have a valid hex! 
            //add the # to the hex if it's missing
            const hex = (/^#{1}/.test(req.body.hex) ? req.body.hex : "#" + req.body.hex);

            //calculate a reasonable contrast color
            const contrastColor = "#" + utils.getContrastColor(hex);

            //Create a new color
            const newColor = new Color({ hex, contrastColor });

            //OPTIONAL ITEMS
            //You may optionally provide a name, but that must be a string
            if (req.body.name) {
                if (typeof req.body.name !== "string") {
                    return res.status(400).json({ error: "Must provide valid name for the color!" });
                }
                newColor.name = req.body.name;
            }

            //Finally, save the document to the db and return the results
            const result = await newColor.save();
            res.status(200).json(result);
        }
        catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },
    delete: async function (req, res) {
        try {
            const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
            if (!checkForHexRegExp.test(req.params.id)) {
                return res.sendStatus(400);
            }

            const deleteAttempt = await Color.deleteOne({ _id: req.params.id });
            if (!deleteAttempt || deleteAttempt.deletedCount === 0) {
                return res.sendStatus(404);
            }

            //successfully deleted!  
            res.sendStatus(204);
        }
        catch (err) {
            res.sendStatus(500);
        }
    }
}