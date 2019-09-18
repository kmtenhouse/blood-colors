"use strict";

const router = require("express").Router();
const casteController = require("../../../controllers/casteController");

//MAIN ROUTES
//healthcheck route
router.get("/", casteController.findAll);
router.post("/", casteController.create);
router.delete("/:id", casteController.delete);

module.exports = router;
