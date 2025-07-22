import React, { useState } from "react";
import style from "./style.module.scss";
import Button from "../../components/atoms/buttons/Button";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data: ", formData);
  };

  return (
    <div className={style.container}>
      <section className={style.formContainer}>
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className={style.inputContainer}>
            <label htmlFor="name">Full Name</label>
            <input
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
            text="Sign Up" 
            clickHandler={() => navigate("/signin")} 
            className={style["button"]}
          />

          <p className={style.text}>
            Already have an account? <Link to="/signin">Login</Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Register;
