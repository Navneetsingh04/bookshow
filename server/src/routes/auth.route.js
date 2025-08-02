const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");

router.get("/me", auth, (req, res) => {
  if (!req.userId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  return res.json({ success: true, userId: req.userId });
});

module.exports = router;
