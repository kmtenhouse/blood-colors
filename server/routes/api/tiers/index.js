"use strict";

const router = require("express").Router();
const tiersController = require("../../../controllers/tier-controller");

//MAIN ROUTES
//healthcheck route
router.get("/", tiersController.findAll);
router.post("/", tiersController.create);
router.get("/:id", tiersController.findOneById)
router.delete("/:id", tiersController.delete);

module.exports = router;
