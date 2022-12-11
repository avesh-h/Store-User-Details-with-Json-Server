import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authInput, setAuthInput] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthInput({
      ...authInput,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToken = await axios
      .post("http://localhost:3001/user", authInput)
      .then((res) => res.data);
    // (async () => {
    //   const getToken = await axios.post("http://localhost:3001/user");
    //   return getToken.data;
    // })().then((res) => console.log(res));

    const getLocalUser = localStorage.getItem("Token");
    // const sendToken = await axios.post(
    //   "http://localhost:3001/userToken",
    //   getLocalUser
    // );
    // console.log(sendToken);

    if (!getLocalUser) {
      // debugger;
      if (authInput.email.includes("@") && authInput.password.length > 6) {
        // setIsLoggedIn(!isLoggedIn);
        // debugger;
        localStorage.setItem("Token", userToken);
        navigate("/dashboard");
      } else {
        return;
      }
    } else {
      navigate("/dashboard");
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
