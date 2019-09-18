"use strict";

const router = require("express").Router();
const colorController = require("../../../controllers/colorController");

//MAIN ROUTES
//healthcheck route
router.get("/", colorController.findAll);
router.post("/", colorController.create);
router.delete("/:id", colorController.delete);

module.exports = router;
