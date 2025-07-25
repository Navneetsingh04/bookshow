import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginPopup } from "../store/slices/popUpSlice";

const AuthRoute = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user); 
  const isAuthenticated = !!user?.email; 
  
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(toggleLoginPopup());
    }
  }, [isAuthenticated, dispatch]);

  return isAuthenticated ? props.children : null;
};

export default AuthRoute;
