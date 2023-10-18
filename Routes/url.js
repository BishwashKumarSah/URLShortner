const express = require("express");
const router = express.Router();

const {
  handleCreateShortUrl,
  handleGetUrlById,
  handleAnalytics,
} = require("../Controller/url");

router.post("/", handleCreateShortUrl);

router.get("/:id", handleGetUrlById);

router.get("/analytics/:id", handleAnalytics);

module.exports = router;
