"use strict";
const Tier = require("../../database/schema/tier");
const router = require("express").Router();

const apiRoutes = require("./api");
const authRoutes = require("./auth");

router.get("/", async (req, res) => {
  let tiers = [];
  
  if (req.user) {
    tiers = await Tier.find({ user: req.user._id }).sort([['order', 'ascending']]).populate("displayColor").populate("colors");
  } 
  res.render("index", { tiers });
});

router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

module.exports = router;
