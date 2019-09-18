
const Color = require("../../database/schema/color");

module.exports = {

    findAllColors: function () {
        return Color.find({});
    },

    createOne: function (colorObj) {
        return new Promise((resolve, reject) => {
            if(!colorObj || !colorObj.hasOwnProperty("name") || typeof(colorObj.name)!=="string" || colorObj.string==="") {
                reject(new Error("Must provide valid name!"))
            }
            if(!colorObj || !colorObj.hasOwnProperty("hex") || typeof(colorObj.hex)!=="string" || colorObj.hex==="") {
                reject(new Error("Must provide valid hex!"))
            }

            Color.create(colorObj)
                .then(result=>resolve(result))
                .catch(err=>reject(err));
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
                    if(!result || result.deletedCount === 0) {
                        reject(new Error("Not Found"))
                    } else {
                        resolve(result);
                    }
                })
                .catch(err=>reject(err));
        })

    }
}