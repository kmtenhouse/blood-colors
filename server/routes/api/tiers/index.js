"use strict";

const router = require("express").Router();
const tiersController = require("../../../controllers/tier-controller");
const colorsController = require("../../../controllers/tier-colors-controller");
const authenticationCheck = require("../../middleware/isAuthenticated").apiAuthCheck;

//MAIN ROUTES
router.get("/", tiersController.findAll);
router.post("/", authenticationCheck, tiersController.create);

//Id matches
router.get("/:id", tiersController.findOneById)
router.put("/:id", authenticationCheck, tiersController.updateOneById)
router.delete("/:id", authenticationCheck, tiersController.delete);

//remove and add individual colors
router.post("/:id/colors/:colorid", authenticationCheck, colorsController.addOneColor)
router.delete("/:id/colors/:colorid", authenticationCheck, colorsController.removeOneColor);

//filters
router.get("/filter/withcolors", tiersController.findAllWithColors);

module.exports = router;
