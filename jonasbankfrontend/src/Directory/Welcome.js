import React from "react";
import styles from "../Styles/Welcome.css";

function Welcome(props) {
  return (
    <div className="welcome">
      <h1>Welcome to JonasBank</h1>
      <div className="links">
        <a className="link" href="/login">Logga in</a>
        <a className="link" href="/register">Registrera användare</a>
      </div>
    </div>
  );
}

export default Welcome;
