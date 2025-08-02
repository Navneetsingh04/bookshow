const mongoose = require("mongoose");

const castSchema = new mongoose.Schema({
  name: { type: String, required: true },       
  character: { type: String, required: true },  
  avatar: { type: String },      
});

const tailerSchema = new mongoose.Schema({
  url: { type: String, required: true },
  thumbnail: { type: String, required: true },
})

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required!"] },
    genres: { type: [String], default: [] },
    year: { type: Number, default: 2017 },
    duration: {
      type: String,
      required: [true, "Duration is required!"],
      default: "",
    },
    trailer: [tailerSchema],
    thumbnailImage: {
      type: String,
      required: [true, "ThumbnailImage is required!"],
    },
    languages: { type: [String], default: ["English"] },
    releaseDate: { type: Date, required: [true, "Release Date is required!"] },
    description: { type: String, default: "" },
    rating: {
      type: Number,
      required: [true, "Rating is Required"],
      default: 4,
    },
    cast: [castSchema],
  },
  { timestamps: true }
);

const movies = mongoose.model("Movies", movieSchema);

module.exports = movies;
