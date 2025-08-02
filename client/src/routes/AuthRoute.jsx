import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginPopup } from "../store/slices/popUpSlice";

const AuthRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const isAuthenticated = Boolean(user?._id);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      dispatch(toggleLoginPopup());
    }
  }, [isAuthenticated, loading, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default AuthRoute;
