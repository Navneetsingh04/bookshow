const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
} = require("../controllers/wishlist.controller");

router.post("/wishlist", auth, addToWishlist);
router.delete("/wishlist/:movieId", auth, removeFromWishlist);
router.get("/:userId/wishlist", auth, getUserWishlist);

module.exports = router;
