"use strict";

const router = require("express").Router();
const tiersController = require("../../../controllers/tier-controller");
const colorsController = require("../../../controllers/tier-colors-controller");
//MAIN ROUTES
//healthcheck route
router.get("/", tiersController.findAll);
router.post("/", tiersController.create);

//Id matches
router.get("/:id", tiersController.findOneById)
router.put("/:id", tiersController.updateOneById)
router.delete("/:id", tiersController.delete);

//remove and add individual colors
router.post("/:id/colors/:colorid", colorsController.addOneColor)
router.delete("/:id/colors/:colorid", colorsController.removeOneColor);


module.exports = router;
