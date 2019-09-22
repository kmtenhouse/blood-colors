"use strict";

const router = require("express").Router();
const colorsController = require("../../../controllers/color-controller");

//MAIN ROUTES
//healthcheck route
router.get("/", colorsController.findAll);
router.post("/", colorsController.create);
router.delete("/:id", colorsController.delete);

module.exports = router;
