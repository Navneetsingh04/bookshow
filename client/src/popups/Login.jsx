import React, { useState } from "react";
import style from "./style.module.scss";
import Button from "../components/atoms/buttons/Button";
import { useDispatch } from "react-redux";
import { closeLoginPopup, toggleRegisterPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import { loginUser } from "../api/user";
import fetchUser from "../store/actions/user.actions";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoading) return; 

    try {
      if (formData.email === "" || formData.password === "") {
        toast.error("Please fill in all fields");
        return;
      }

      setIsLoading(true);
      const result = await loginUser(formData);
    
      if (result?.data && result.success !== false) {
        toast.success("Logged in successfully");
        dispatch(fetchUser());
        dispatch(closeLoginPopup());
      } else {
        const error = result?.error || result?.message || "Login failed. Please try again.";
        toast.error(error);
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = 
      error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
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
          <h1>Login</h1>
          
          <div className={style.inputContainer}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email address"
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
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              required
              onChange={(e) => 
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          
          <Button 
            text={isLoading ? "Signing In..." : "Sign In"} 
            type="submit"
            className={style["button"]} 
            disabled={isLoading}
          />
          
          <p className={style.text}>
            Don't have an account?{" "}
            <span onClick={switchToRegister} className={style.link}>
              Register
            </span>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;