const User = require("../model/user.model");

async function addToWishlist(req, res) {
  try {
    const userId = req.userId;
    const { movieId } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Not authenticated",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    if (user.wishlist && user.wishlist.includes(movieId)) {
      return res.status(400).json({
        success: false,
        error: "Movie already in wishlist",
      });
    }

    if (!user.wishlist) {
      user.wishlist = [];
    }
    user.wishlist.push(movieId);
    await user.save();

    return res.status(200).json({
      success: true,
      result: "Movie added to wishlist",
    });
  } catch (error) {
    console.error("Add to wishlist error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function removeFromWishlist(req, res) {
  try {
    const userId = req.userId;
    const { movieId } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "Not authenticated",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Remove movie from wishlist
    if (user.wishlist) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== movieId);
      await user.save();
    }

    return res.status(200).json({
      success: true,
      result: "Movie removed from wishlist",
    });
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

async function getUserWishlist(req, res) {
  try {
    const userId = req.userId;
    const { userId: paramUserId } = req.params;

    if (!userId || (paramUserId && userId !== paramUserId)) {
      return res.status(401).json({
        success: false,
        error: "Not authorized",
      });
    }

    const user = await User.findById(userId).populate("wishlist");
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      result: user.wishlist || [],
    });
  } catch (error) {
    console.error("Get wishlist error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

module.exports = { addToWishlist, removeFromWishlist, getUserWishlist };
