const express = require("express");

const {
  searchMovie,
  getAllMovies,
  recommendedMovies,
  getMovie,
  getHomePageMovies,
  getCast,
  getTailers,
} = require("../controllers/movies.controller");

const router = express.Router();

router.get("/all", getAllMovies);
router.get("/recommended", recommendedMovies);
router.get("/", searchMovie);
router.get("/homepage", getHomePageMovies);
router.get("/:id", getMovie);
router.get("/:id/cast", getCast);
router.get("/:id/trailer", getTailers);

module.exports = router;
