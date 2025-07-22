import React, { useState } from "react";
import style from "./style.module.scss";
import Button from "../components/atoms/buttons/Button";
import { useDispatch } from "react-redux";
import { closeLoginPopup, toggleRegisterPopup } from "../store/slices/popUpSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data: ", formData);
    // Close popup after successful login
    dispatch(closeLoginPopup());
  };

  const switchToRegister = () => {
    dispatch(closeLoginPopup());
    dispatch(toggleRegisterPopup());
  };

  return (
    <div className={style.container}>
      <section className={style.formContainer}>
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>

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
