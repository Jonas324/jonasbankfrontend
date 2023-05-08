import { useState } from "react";

function UpdateUser() {
  const [username, setUsername] = useState("");

  var localUser = localStorage.getItem("user");
  if (localUser) {
    localUser = JSON.parse(localUser);
  }
  var userId = localUser.userId;

  var chosenUser = localStorage.getItem("chosenUser");
  if (chosenUser) {
    chosenUser = JSON.parse(chosenUser);
  }

  const token = localStorage.getItem("token");

  function handleSubmit(event) {
    event.preventDefault();

    const payload = JSON.stringify({
        username: username,
        password: localUser.password,
        credit: localUser.credit,
        isAccountNonExpired: localUser.isAccountNonExpired,
        isAccountNonLocked: localUser.isAccountNonLocked,
        isCredentialsNonExpired: localUser.isCredentialsNonExpired,
        isEnabled: localUser.isEnabled,
        role: localUser.role
    });

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    };

    fetch(`http://localhost:8082/user/updateUser/${userId}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("token", data.token); // update token in local storage
    })  
    .catch((error) => console.error(error));

    event.target.reset();
  }

  return (
    <div className="App">
      <h1>Update your account</h1>
      <div className="chatinput">
        <form onSubmit={handleSubmit}>
          <label>
            <p>Write new name for your account</p>
            <input
              type="text"
              name="Username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <button type="submit">Update account</button>
          <p>After you update you need to logout and then login to your acount</p>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;