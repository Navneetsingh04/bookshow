import axios from "./_api.js";

export const loginUser = (userBody ) => axios.post("/users/login" ,userBody)

export const registerUser = (userBody) => axios.post("users/signup",userBody)

export const logoutUser = () => axios.get("/users/logout");
export const getMe = () => axios.get("users/me");
