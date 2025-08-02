const Movies = require("../model/movies.model");

async function addCast(req, res) {
  try {
    const { id } = req.params;
    const { name, character, avatar } = req.body;

    if (!name || !character) {
      return res
        .status(400)
        .json({ message: "Name and Character are required" });
    }
    const movie = await Movies.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie Not Found" });
    }

    movie.cast.push({ name, character, avatar });
    await movie.save();
    res.status(200).json({ message: "Cast added", cast: movie.cast });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function addTailers(req, res) {
  try {
    const { id } = req.params;
    const { url, thumbnail } = req.body;

    if (!url || !thumbnail) {
      return res
        .status(400)
        .json({ message: "URL and Thumbnail are required" });
    }

    const movie = await Movies.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie Not Found" });
    }

    movie.trailer.push({ url, thumbnail });
    await movie.save();
    res.status(200).json({ message: "Trailer added", trailer: movie.trailer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = { addCast, addTailers };
