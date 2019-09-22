const Color = require("../services/color-service");

module.exports = {
    findOneById: function(req, res) {
        Color.findOneById(req.params.id)
            .then(result => res.json(result))
            .catch(err=>res.status(500).json({error: err.message}));
    },
    findAll: function (req, res) {
        Color.findAll()
            .then(results => res.json(results))
            .catch(err => res.status(500).json({ error: err.message }));
    },
    create: function (req, res) {
        Color.createOne({ name: req.body.name, hex: req.body.hex })
            .then(result => res.json(result))
            .catch(err => res.status(400).json({ error: err.message }));
    },
    delete: function (req, res) {
        Color.deleteOne(req.params.id)
            .then(result => res.json(result))
            .catch(err => {
                (err.message === "Not Found" ? res.status(404) : res.status(400));
                res.json({ error: err.message });
            });
    }
}