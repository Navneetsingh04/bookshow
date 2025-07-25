import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginPopup } from "../store/slices/popUpSlice";

const AuthRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const isAuthenticated = Boolean(user?.email);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(toggleLoginPopup());
    }
  }, [isAuthenticated, dispatch]);

  return isAuthenticated ? children : null;
};

export default AuthRoute;
