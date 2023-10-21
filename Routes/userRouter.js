const express = require("express");

const { handleUserLoginIn, handleUserSignUp } = require("../Controller/user");

const router = express.Router();

router.post("/", handleUserSignUp);
router.post("/login", handleUserLoginIn);

module.exports = router;
