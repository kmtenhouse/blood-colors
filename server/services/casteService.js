
const Caste = require("../../database/schema/caste");

module.exports = {

    findAllCastes: function () {
        return Caste.find({});
    },

    createOne: function (casteObj) {
    
        return new Promise((resolve, reject) => {
            if(!casteObj || !casteObj.hasOwnProperty("name") || typeof(casteObj.name)!=="string" || casteObj.name==="") {
                reject(new Error("Must provide valid name!"))
            }

            Caste.create(casteObj)
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
            Caste.deleteOne({ _id: id })
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