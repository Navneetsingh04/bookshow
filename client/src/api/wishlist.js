import axios from "./_api.js";

export const getUserWishlist = async (userId) => {
    return await axios.get(`/users/${userId}/wishlist`);
};

export const addToWishlist = async (movieId) => {
    return await axios.post("/users/wishlist", { movieId });
};

export const removeFromWishlist = async (movieId) => {
    return await axios.delete(`/users/wishlist/${movieId}`);
};
