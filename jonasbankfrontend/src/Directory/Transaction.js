import { useState, useEffect } from "react";



function Transaction(){
  
  const [content, setContent] = useState('');
  const [joke, setJoke] = useState('');

  var localUser = localStorage.getItem('user');
  if (localUser) {
    localUser = JSON.parse(localUser);  
  }
  var userId = localUser.userId;

  var chosenUser = localStorage.getItem('chosenUser');
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
    credit: content
  });

  
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`},
    body: payload,
  }

  fetch('http://localhost:8082/transaction', requestOptions)
  .then(response => response.json());

  event.target.reset();

};

    return(
    <div className="App">
    <h1>New Transaction</h1>
    
    <div className="chatinput">
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" name="name" onChange={(e) => setContent(e.target.value)}/>
        </label>
        <button type="submit">Send credit</button>
      </form>
    
    </div>
  </div>
    )
};

export default Transaction;