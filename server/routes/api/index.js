"use strict";

const router = require("express").Router();
const colorRoutes = require("./colors");

//MAIN ROUTES
//healthcheck route
router.get("/", (req, res) => {
    res.send("API ROUTES");
  });

router.use("/colors", colorRoutes);

module.exports = router;
