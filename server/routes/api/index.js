"use strict";

const router = require("express").Router();
const colorRoutes = require("./colors");
const castesRoutes = require("./castes");

//MAIN ROUTES
//healthcheck route
router.get("/", (req, res) => {
    res.send("API ROUTES");
  });

router.use("/colors", colorRoutes);
router.use("/castes", castesRoutes);

module.exports = router;
