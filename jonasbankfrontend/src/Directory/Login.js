import { useState } from "react";
import { Navigate } from "react-router-dom";

function Login(props) {

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [isLoggedIn, setIsLoggedIn] = useState(false)

function handleSubmit(event) {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const payload = JSON.stringify({
            username: username,
            password: password
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: payload,
        redirect: 'follow'
    }

  fetch('http://localhost:8082/api/auth/login', requestOptions)
  .then(response => response.json())
        .then(data => {
          localStorage.setItem("token", (data.token))
          localStorage.setItem("user", (data.user))
          setIsLoggedIn(true)
          console.log(data.token);
          console.log(data.user);
        })
        .catch((error) => console.log("error", error));     
}

if  (isLoggedIn == true) {
  return <Navigate to="/User"/>
}

return (
<>
    <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} 
          type="username" placeholder="your username" />
        <label htmlFor="password">Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} 
        type="password" placeholder="*******"/>
        <button type="submit">Logga in</button>
    </form>
    <a href="/register">Register</a>
</>
);
}

export default Login;
