const Tier = require("../../database/schema/tier");
const Color = require("../../database/schema/color");

module.exports = {
    addOneColor: async function (req, res) {
        try {
            //attempt to look up the color
            let colorToAdd = await Color.findById(req.params.colorid);
            if (!colorToAdd) {
                return res.status(404).json({ error: "Color not found!" });
            }

            //now attempt to update the tier
            let result = await Tier.updateOne({ _id: req.params.id, 'colors': { $ne: colorToAdd._id } }, { $push: { colors: colorToAdd._id } }, { new: true });
            if (!result) {
                return res.status(404).json({ error: "Tier not found!" });
            }

            //If we did correctly update the tier, update the color as well!
            colorToAdd.tier = result._id;
            await colorToAdd.save();

            res.sendStatus(204);
        }
        catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    },
    removeOneColor: async function (req, res) {
        try {
            if (!req.params.id || !req.params.colorid) {
                return res.sendStatus(400);
            }
            //Attempt to remove the color from the tier
            let result = await Tier.updateOne({ _id: req.params.id }, { $pull: { colors: req.params.colorid } }, { new: true });
            if (!result) {
                return res.status(404).json({ error: "Tier not found!" });
            }

            //If we did correctly update the tier, attempt to find and remove the color as well!
            //attempt to look up the color
            let colorToUpdate = await Color.findById(req.params.colorid);
            if(colorToUpdate) {
                colorToUpdate.tier="";
                await colorToUpdate.save();
            }

            res.sendStatus(204);
        }
        catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}