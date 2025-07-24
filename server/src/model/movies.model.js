const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required!"] },
    genres: { type: String, default: "" },
    year : { type : Number, default: 2017},
    duration: {
      type: Number,
      required: [true, "Duration is required!"],
      default: 0,
    },
    trailer: { type: String, default: "" },
    thumbnailImage: {
      type: String,
      required: [true, "ThumbnailImage is required!"],
    },
    voteCount: { type: Number, default: 0 },
    languages: { type: String, default: "English" },
    popularity: { type: Number, default: 0 },
    releasedDate: { type: Date, required: [true, "Release Date is required!"] },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const movies = mongoose.model("Movies",movieSchema)

module.exports = movies;