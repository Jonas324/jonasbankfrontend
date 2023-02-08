import React from 'react'
import { useEffect, useState } from 'react';


function Payment(){

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userList, setUserList] = useState();
  const [chosenUser, setChosenUser] = useState('');

  var localUser = localStorage.getItem('user');
  if (localUser) {
    localUser = JSON.parse(localUser);  
  }
  var userId = localUser.userId;

  const token = localStorage.getItem("token");

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
   
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      var fetchAllUsers = fetch("http://localhost:8082/user/getAllUsers", requestOptions)
        .then((response) => response.json())
        .then((data) => setUserList(data))
        .catch((error) => console.error(error));
      }
  }, []); 

  const saveData = () => {
    localStorage.setItem('chosenUser', chosenUser);
  };

    return(
        <div className="App">
        <h1>Pick user to chatt with</h1>
        <p> Chosen user to chat with: {chosenUser}</p>
      
      <button onClick={saveData}>
        <a href='/transaction'> Start chat </a>
      </button>
  
      <select
              value="username"
              className="form-control"
              onChange={(event) => {
                setChosenUser(event.target.value);
                localStorage.setItem("chosenUser", chosenUser);
              }}
            >
              
              {userList && userList.map((item, index) => (
                <option key={index} value={item.userId}>
                  {item.username}
                </option>
              ))}
      </select>
      </div>
    )
};
  export default Payment;