"use strict";
const Tier = require("../services/tier-service");
const router = require("express").Router();

const apiRoutes = require("./api");
const authRoutes = require("./auth");

router.get("/", async (req, res) => {
  let tiers = [];
  console.log("Current user:")
  console.log(req.user);

  if (req.user && req.user._id) {
    tiers = await Tier.findAllByUser(req.user._id);
    console.log(tiers);
  } 
  res.render("index", { tiers });
});

router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

module.exports = router;
