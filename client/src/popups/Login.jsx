import React, { useState } from "react";
import style from "./style.module.scss";
import Button from "../components/atoms/buttons/Button";
import { useDispatch } from "react-redux";
import { closeLoginPopup, toggleRegisterPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import {loginUser} from "../api/user"
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    
    
    try {
      e.preventDefault();
      console.log("Login data: ",formData);
      if(formData.email === "" || formData.password === "") {
        toast.error("Please fill in all fields");
        return;
      }
      const result = await loginUser(formData);
      console.log("Login Data: ", result);
      if (result.data) {
        toast.success("Logged in Successfully");
        // TODO: Store user data in Redux store or localStorage
        // dispatch(setUser(result.data.user));
        dispatch(closeLoginPopup());
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const switchToRegister = () => {
    dispatch(closeLoginPopup());
    dispatch(toggleRegisterPopup());
  };

  return (
    <div className={style.container}>
      <section className={style.formContainer}>
        <form onSubmit={handleSubmit}>
          <h1>LogIn</h1>

          <div className={style.inputContainer}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              required
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              required
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <Button text="Sign In" clickHandler={handleSubmit} className={style["button"]} />

          <p className={style.text}>
            Don't have an account? <span onClick={switchToRegister} className={style.link}>Register</span>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;
