import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginPopup } from "../store/slices/popUpSlice";

const AuthRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const isAuthenticated = Boolean(user?._id);

  useEffect(() => {
    // Only show login popup if we're not loading and user is definitely not authenticated
    if (!loading && !isAuthenticated) {
      dispatch(toggleLoginPopup());
    }
  }, [isAuthenticated, loading, dispatch]);

  // Show nothing while loading
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // If not authenticated, return null (login popup will handle this)
  if (!isAuthenticated) {
    return null;
  }
  
  // If authenticated, render children
  return children;
};

export default AuthRoute;
