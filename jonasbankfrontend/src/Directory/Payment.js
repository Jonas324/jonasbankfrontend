import React from "react";
import { useEffect, useState } from "react";
import styles from "../Styles/Payment.css";

function Payment() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userList, setUserList] = useState();
  const [chosenUser, setChosenUser] = useState("");

  var localUser = localStorage.getItem("user");
  if (localUser) {
    localUser = JSON.parse(localUser);
  }
  var userId = localUser.userId;

  const token = localStorage.getItem("token");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      var fetchAllUsers = fetch(
        "http://localhost:8082/user/getAllUsers",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => setUserList(data))
        .catch((error) => console.error(error));
    }
  }, []);

  const saveData = () => {
    localStorage.setItem("chosenUser", chosenUser);
  };

  return (
    <div className="payment">
      <h1>Welcome to the payment page</h1>
      <p>Chose user to send credits too.</p>
      <p> chosen user: {chosenUser}</p>

      <div className="buttonSelect">
        <button className="paymentlink" onClick={saveData}>
          <a href="/transaction"> Start transaction</a>
        </button>

        <select
          value="username"
          className="form-control select"
          onChange={(event) => {
            setChosenUser(event.target.value);
            localStorage.setItem("chosenUser", chosenUser);
          }}
        >
          {userList &&
            userList.map((item, index) => (
              <option key={index} value={item.userId}>
                {item.username}
              </option>
            ))}
        </select>
      </div>
      <button className="link">
        <a href="/User">User Page</a>
      </button>
    </div>
  );
}
export default Payment;
