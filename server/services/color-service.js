
const Color = require("../../database/schema/color");

module.exports = {

    findAllcolors: function () {
        return Color.find({});
    },

    createOne: function (colorObj) {
        return new Promise((resolve, reject) => {
            if(!colorObj || !colorObj.hasOwnProperty("text") || typeof(colorObj.text)!=="string") {
                reject(new Error("Must provide valid text!"))
            }
            if(colorObj.text==="") {
                reject(new Error("Cannot provide empty string for text!"));
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