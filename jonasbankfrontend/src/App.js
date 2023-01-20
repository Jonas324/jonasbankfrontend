import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8082/user/1")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);
  console.log(user);

  return (
    <div className="App">
      <h1>Jonas Bank app</h1>
      <div className="chatwindow">
        <p>username: {user.username}</p>
        <p>user ID: {user.id}</p>
        <p>credit: {user.credit}</p>
      </div>
    </div>
  );
}
export default App;
