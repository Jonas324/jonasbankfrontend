import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import styles from "../Styles/Register.css";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      username: username,
      password: password,
      isAccountNonExpired: "true",
      isAccountNonLocked: "true",
      isCredentialsNonExpired: "true",
      isEnabled: "true",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: payload,
      redirect: "follow",
    };

    fetch("http://localhost:8082/api/auth/register", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);
        setIsLoggedIn(true);
        console.log(data.token);
        console.log(data.user);
      })
      .catch((error) => console.log("error", error));
  }

  if (isLoggedIn == true) {
    return <Navigate to="/User" />;
  }

  return (
    <>
      <div className="register">
        <form className="form" onSubmit={handleSubmit}>
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="username"
            placeholder="your username"
          />
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="*******"
          />
          <button className="link" type="submit">
            Register User
          </button>
          <p className="text">Already have an account?</p>
          <a className="link" href="/login">
            Login
          </a>
        </form>
      </div>
    </>
  );
}

export default Register;
