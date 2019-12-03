"use strict";

const router = require("express").Router();
const colorsController = require("../../../controllers/color-controller");

//MAIN ROUTES
//Get all colors
router.get("/", colorsController.findAll);
//Create a new color
router.post("/", colorsController.create);

//Read, modify, or delete an individual color
router.get("/:id", colorsController.findOneById);
router.put("/:id", colorsController.updateOneById);
router.delete("/:id", colorsController.delete);

//Filter
router.get("/filter/withtier", colorsController.findColorsWithTier);
router.get("/filter/notier", colorsController.findColorsWithNoTier);

module.exports = router;
