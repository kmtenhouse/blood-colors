"use strict";
const Tier = require("../services/tier-service");
const router = require("express").Router();

router.get("/", async (req, res) => {
  if(!req.user || !req.user._id) {
    return res.redirect("/login");
  }
  const tiers = await Tier.findAllByUser(req.user._id);
  res.render("index", { tiers });
});

router.get("/login", async(req, res) => {
    res.render("login");
})

module.exports = router;
