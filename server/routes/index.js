"use strict";
const Tier = require("../../database/schema/tier");
const router = require("express").Router();

const apiRoutes = require("./api");
const authRoutes = require("./auth");

router.get("/", async (req, res)=>{
  const tiers = await Tier.find({}).sort([['order', 'ascending']]).populate("displayColor").populate("colors");
  res.render("index", {tiers});
});

router.use("/api", apiRoutes);
router.use("/auth", authRoutes);

module.exports = router;
