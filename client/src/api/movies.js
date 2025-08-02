import axios from "./_api";

const getAllMovies = (page = 1, limit = 10) => {
  return axios.get(`/movies/all?page=${page}&limit=${limit}`);
};

const searchMovies = (title) => {
  return axios.get(`/movies?title=${encodeURIComponent(title)}`);
};

const getMovie = (id) => {
  return axios.get(`/movies/${id}`);
};

const getHomepageMovies = () => {
  return axios.get(`/movies/homepage`);
};

const getCast = (id) => {
  return axios.get(`/movies/${id}/cast`);
}
const getTailers = (id) => {
  return axios.get(`/movies/${id}/trailer`);
}
export {
  getAllMovies,
  searchMovies,
  getMovie,
  getHomepageMovies,
  getCast,
  getTailers,
};
