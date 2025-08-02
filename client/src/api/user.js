import axios from "./_api.js";

export const loginUser = async (userBody ) => {
    return await axios.post("/users/login" ,userBody)
}

export const registerUser = async (userBody) =>{
    return await axios.post("users/signup",userBody)
} 

export const logoutUser = async () =>{
    return await axios.get("/users/logout");

} 
export const getMe = async () => {
    return await axios.get("/users/me");
}

