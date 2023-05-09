import { useState, useEffect } from "react";
import styles from "../Styles/Transaction.css";

function Transaction() {
  const [content, setContent] = useState("");
  const [noMoney, setNoMoney] = useState(false);
  const [cantSend, setCantSend] = useState(false);

  var localUser = localStorage.getItem("user");
  if (localUser) {
    localUser = JSON.parse(localUser);
  }
  var userId = localUser.userId;
  var userCredit = localUser.credit;

  var chosenUser = localStorage.getItem("chosenUser");
  if (chosenUser) {
    chosenUser = JSON.parse(chosenUser);
  }

  const token = localStorage.getItem("token");

  function handleSubmit(event) {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const payload = JSON.stringify({
      senderId: userId,
      receiverId: chosenUser,
      credit: content,
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    };

    if (content > userCredit) {
      setNoMoney(true);
    } else if (content <= 0) {
      setCantSend(true);
    } else {
      setNoMoney(false);
      fetch("http://localhost:8082/transaction", requestOptions)
        .then((response) => response.json())
        .catch((error) => console.error(error));
    }

    event.target.reset();
  }

  return (
    <div className="transaction">
      <h1>New Transaction</h1>
      <div className="chatinput">
        <form onSubmit={handleSubmit}>
          <div className="buttonSelect">
            <button className="transactionlink" type="submit">
              Send credit
            </button>
              <input
              className="transactioninput"
                type="text"
                name="name"
                onChange={(e) => setContent(e.target.value)}
              />
          </div>
          {noMoney && <p id="error">Not enough money to send. sorry!</p>}
          {cantSend && <p id="error">You can't send 0 or negative credit. Nice try hacker!</p>}
        </form>
        <button className="userlink">
          <a href="/User">User page</a>
        </button>
      </div>
    </div>
  );
}

export default Transaction;
