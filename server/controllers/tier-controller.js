const Tier = require("../services/tier-service");

module.exports = {
    findOneById: function(req, res) {
        Tier.findOneById(req.params.id)
            .then(result => res.json(result))
            .catch(err=>res.status(500).json({error: err.message}));
    },
    findAll: function (req, res) {
        Tier.findAll()
            .then(results => res.json(results))
            .catch(err => res.status(500).json({ error: err.message }));
    },
    create: function (req, res) {
        Tier.createOne(req.body) //TO-DO: let you create a tier with a color id
            .then(result => res.json(result))
            .catch(err => res.status(400).json({ error: err.message }));
    },
    updateOneById: function(req, res) {
        //Check that we're trying to update the same item that we are hitting via the route -- don't want any mismatches!
        if(req.body._id!==req.params.id) {
            return res.status(400).json({ error: "Id mismatch!"})
        }
        
        Tier.updateOneById(req.body) 
            .then(result=>res.json(result))
            .catch(err=>res.status(500).json({error: err.message}))
    },
    delete: function (req, res) {
        Tier.deleteOne(req.params.id)
            .then(result => res.json(result))
            .catch(err => {
                (err.message === "Not Found" ? res.status(404) : res.status(400));
                res.json({ error: err.message });
            });
    }
}