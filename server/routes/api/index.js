"use strict";

const router = require("express").Router();
const colorRoutes = require("./colors");
const tierRoutes = require("./tiers");

//MAIN ROUTES
//healthcheck route
router.get("/", (req, res) => {
    res.send("API ROUTES");
  });

router.use("/colors", colorRoutes);
router.use("/tiers", tierRoutes);

module.exports = router;
