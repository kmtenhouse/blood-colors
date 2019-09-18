"use strict";

const router = require("express").Router();

const apiRoutes = require("./api");

//MAIN ROUTES
//healthcheck route
router.get("/", (req, res) => {
  res.send("Slash route");
});

router.use("/api", apiRoutes);

module.exports = router;
