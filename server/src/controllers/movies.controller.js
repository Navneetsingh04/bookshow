const Movies = require("../model/movies.model.js");

async function getAllMovies(req, res) {
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;
    const response = await Movies.find(
      {},
      {
        title: 1,
        rating: 1,
        duration: 1,
        thumbnailImage: 1,
        genres: 1,
        year: 1,
      }
    )
      .skip(skip)
      .limit(limit);
    res.status(200).json(response);
  } catch (error) {
    console.log({ error });
    res.status(400).json({
      error,
    });
  }
}

// Get movies by id  /movies/:id
async function getMovie(req, res) {
  try {
    const { id } = req.params;

    const movie = await Movies.findById(id, {
      title: 1,
      releaseDate: 1,
      duration: 1,
      thumbnailImage: 1,
      genres: 1,
      year: 1,
      releaseDate: 1,
      description: 1,
      rating: 1,
      cast: 1,
      languages: 1
    });
    if (!movie) {
      return res.status(404).json({ message: "Movie Not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function searchMovie(req, res) {
  try {
    const { title } = req.query;

    if (!title) {
      return res.status(400).json({ message: "title is Required" });
    }

    const movies = await Movies.find({
      title: { $regex: title, $options: "i" },
    }).select(
      "title thumbnailImage description duration genres releaseDate rating languages year"
    );

    res.status(200).json(movies);
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function getHomePageMovies(req, res) {
  try {
    const movie = await Movies.aggregate([
      { $sample: { size: 8 } },
      {
        $project: {
          title: 1,
          duration: 1,
          thumbnailImage: 1,
          genres: 1,
          year: 1,
          rating: 1,
        },
      },
    ]);
    res.status(200).json(movie);
  } catch (err) {
    console.log({ err });
    res.status(400).json({ err });
  }
}

async function getCast(req,res){
  try {
    const { id}  = req.params;
    const movie = await Movies.findById(id).select("cast");
    if(!movie) {
      return res.status(404).json({ message: "Movie Not Found" });
    }
    res.status(200).json(movie.cast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTailers(req,res){
  try {
    const { id } = req.params;
    const movie = await Movies.findById(id).select("trailer");
    if(!movie) {
      return res.status(404).json({ message: "Movie Not Found" });
    }
    res.status(200).json(movie.trailer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function recommendedMovies(req, res) {}

module.exports = {
  getAllMovies,
  getMovie,
  searchMovie,
  recommendedMovies,
  getHomePageMovies,
  getCast,
  getTailers,
};
