import React from 'react'
import { Navigate } from 'react-router';

const NonAuthRoute = (props) => {
  const isAuthenticated = false;

  return isAuthenticated ? <Navigate to={"/"} /> : props.children
}

export default NonAuthRoute
