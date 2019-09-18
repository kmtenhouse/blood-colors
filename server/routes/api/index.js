"use strict";

const router = require("express").Router();
const exampleRoutes = require("./examples");

//MAIN ROUTES
//healthcheck route
router.get("/", (req, res) => {
    res.send("API ROUTES");
  });

router.use("/examples", exampleRoutes);

module.exports = router;
