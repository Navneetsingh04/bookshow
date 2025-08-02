import { getUserWishlist, addToWishlist as addToWishlistAPI, removeFromWishlist as removeFromWishlistAPI } from "../../api/wishlist";
import { 
  wishlistRequest, 
  wishlistSuccess, 
  wishlistFailure, 
  addToWishlist, 
  removeFromWishlist 
} from "../slices/wishlistSlice";

export const fetchWishlist = (userId) => async (dispatch) => {
  try {
    dispatch(wishlistRequest());
    const response = await getUserWishlist(userId);
    if (response.status === 200) {
      dispatch(wishlistSuccess(response.data.result || []));
    }
  } catch (error) {
    dispatch(wishlistFailure(error?.response?.data?.message || error.message));
  }
};

export const toggleWishlist = (movie) => async (dispatch, getState) => {
  try {
    const { wishlist } = getState().wishlist;
    const isInWishlist = wishlist.find(item => item._id === movie._id);
    
    if (isInWishlist) {
      await removeFromWishlistAPI(movie._id);
      dispatch(removeFromWishlist(movie._id));
    } else {
      await addToWishlistAPI(movie._id);
      dispatch(addToWishlist(movie));
    }
  } catch (error) {
    console.error("Wishlist toggle error:", error);
  }
};
