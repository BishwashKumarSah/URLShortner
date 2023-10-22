const express = require("express");
const router = express.Router();

const URL = require("../Model/url");

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const urls = await URL.find({ createdBy: req.user._id });
  return res.render("home", { urls: urls });
});

router.get("/signUp", async (req, res) => {
  return res.render("signUp");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
