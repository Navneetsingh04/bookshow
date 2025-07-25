import React, { useState } from "react";
import style from "./style.module.scss";
import Button from "../components/atoms/buttons/Button";
import { useDispatch } from "react-redux";
import {
  toggleLoginPopup,
  closeRegisterPopup,
} from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import { registerUser } from "../api/user";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    try {
      if (
        formData.name === "" ||
        formData.email === "" ||
        formData.password === "" ||
        formData.confirmPassword === ""
      ) {
        toast.error("Please fill in all fields");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast.error("Password and confirm password should match");
        return;
      }

      if (formData.password.length < 8) {
        toast.error("Password should be at least 8 characters long");
        return;
      }

      setIsLoading(true);
      const result = await registerUser(formData);

      if (result?.data && result.success !== false) {
        toast.success("Registration successful");
        dispatch(closeRegisterPopup());
        dispatch(toggleLoginPopup());
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Register error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const switchToLogin = () => {
    dispatch(closeRegisterPopup());
    dispatch(toggleLoginPopup());
  };

  return (
    <div className={style.container}>
      <section className={style.formContainer}>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className={style.inputContainer}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter Full Name"
              value={formData.name}
              required
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email Address"
              value={formData.email}
              required
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <div className={style.inputContainer}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              required
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
          </div>

          <div className={style.checkbox}>
            <input
              type="checkbox"
              id="togglePassword"
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <label htmlFor="togglePassword">Show Passwords</label>
          </div>

          <Button
            text={isLoading ? "Signing Up..." : "Sign Up"}
            type="submit"
            className={style["button"]}
            disabled={isLoading}
          />

          <p className={style.text}>
            Already have an account?{" "}
            <span onClick={switchToLogin} className={style.link}>
              Login
            </span>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Register;
