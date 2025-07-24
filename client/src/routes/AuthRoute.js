import React from 'react'
import { useDispatch } from 'react-redux';
import { toggleLoginPopup } from '../store/slices/popUpSlice';

const AuthRoute = (props) => {
  const isAuthenticated = true;

  return isAuthenticated ? props.children : useDispatch(toggleLoginPopup)
}

export default AuthRoute
