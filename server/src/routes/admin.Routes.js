const express = require("express");

const {addCast,addTailers} = require("../controllers/admin.controller");

const router = express.Router();

router.post("/movies/:id/cast", addCast);
router.post("/movies/:id/trailer", addTailers);

module.exports = router;