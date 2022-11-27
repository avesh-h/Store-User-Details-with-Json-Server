import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authInput, setAuthInput] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthInput({
      ...authInput,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getLocalUser = localStorage.getItem("isLoggedIn");
    if (!getLocalUser) {
      if (authInput.email.includes("@") && authInput.password.length > 6) {
        setIsLoggedIn(!isLoggedIn);
        localStorage.setItem("isLoggedIn", !isLoggedIn);
        navigate("/dashboard");
      } else {
        return;
      }
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>User log in form</h1>
      <label>Email:</label>
      <input
        type="text"
        value={authInput.email}
        name="email"
        onChange={handleChange}
      />
      <br />
      <label>Password:</label>
      <input
        type="text"
        value={authInput.password}
        name="password"
        onChange={handleChange}
      />
      <br />
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;
