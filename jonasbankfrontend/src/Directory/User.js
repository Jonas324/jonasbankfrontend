import React, { useState, useEffect } from "react";
import styles from "../Styles/User.css";

function UserData() {
  const [user, setUser] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  var localUser = localStorage.getItem("user");
  if (localUser) {
    localUser = JSON.parse(localUser);
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("chosenUser");
    window.location.href = "/";
  };

  const token = localStorage.getItem("token");
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    fetch(`http://localhost:8082/user/${localUser.userId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => setError(error));
    console.log(user.userId);
  }, []);

  return (
    <>
      <div className="user">
        <h1>Hello! Try and make a payment</h1>
        <div>
          <h2>User: {user.username}</h2>
          <h2>User ID: {user.userId}</h2>
          <h2>Credit: {user.credit}</h2>
        </div>

        <h3 className="comeBack">
          come back here after a transaction and see how the credit has been
          updated.
        </h3>

        <button className="link">
          <a href="/payment">Payment</a>
        </button>

        <button className="link">
          <a href="/updateUser">Update user</a>
        </button>

        <button id="logout" className="link" onClick={logout}>Logout</button>

        <button className="link" id="delete">
          <a href="/deleteUser">Delete user</a>
        </button>

      </div>
    </>
  );
}

export default UserData;
