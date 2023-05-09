import { useState } from "react";
import styles from "../Styles/UpdateUser.css";


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
    <div className="updateUser">
      <h1>Update your account</h1>
      <div className="chatinput">
        <form onSubmit={handleSubmit}>
          <p>Write new name for your account</p>
          <label className="buttonSelect">
            <button className="updatelink" type="submit">Update account</button>
            <input
              className="updateinput"
              type="text"
              name="Username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <p id="oops">Oops! After you update you need to logout and then login to your acount</p>
        </form>
        <button className="userlink">
          <a href="/User">User page</a>
        </button>
      </div>
    </div>
  );
}

export default UpdateUser;