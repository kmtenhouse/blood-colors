"use strict";

const router = require("express").Router();
const colorsController = require("../../../controllers/color-controller");
const authenticationCheck = require("../../middleware/isAuthenticated").apiAuthCheck;

//MAIN ROUTES
//Get all colors
router.get("/", colorsController.findAll);
//Create a new color
router.post("/", authenticationCheck, colorsController.create);

//Read, modify, or delete an individual color
router.get("/:id", colorsController.findOneById);
router.put("/:id", authenticationCheck, colorsController.updateOneById);
router.delete("/:id", authenticationCheck, colorsController.delete);

//Filter
router.get("/filter/withtier", colorsController.findColorsWithTier);
router.get("/filter/notier", colorsController.findColorsWithNoTier);

module.exports = router;
