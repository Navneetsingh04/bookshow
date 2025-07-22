import React, { useState } from "react";
import style from "./style.module.scss";
import Button from "../../components/atoms/buttons/Button";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data: ", formData);
  };

  const navigate = useNavigate();

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

          <Button text="Sign In" clickHandler={() => navigate("/")} className={style["button"]} />

          <p className={style.text}>
            Don't have an account? <Link to="/signup">Register</Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Login;
