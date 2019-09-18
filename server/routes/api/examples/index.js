"use strict";

const router = require("express").Router();
const exampleController = require("../../../controllers/exampleController");

//MAIN ROUTES
//healthcheck route
router.get("/", exampleController.findAll);
router.post("/", exampleController.create);
router.delete("/:id", exampleController.delete);

module.exports = router;
