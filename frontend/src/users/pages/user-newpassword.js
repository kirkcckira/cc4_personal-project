import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import NavBar from "../../navigation/NavBar.component";

const UserNewPassword = (props) => {
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios({
      method: "PATCH",
      data: { password: password, email: props.email },
      withCredentials: true,
      url: `http://localhost:5000/api/user/`,
    }).then((res) => {
      console.log(res);
      setRedirect(true);
    });
  };

  return (
    <React.Fragment>
      {redirect && <Redirect to="/login" />}
      <div className="container" style={{ marginTop: "2rem" }}>
        <div className="row w-100 h-100 flex-column">
          <h2 className="font-weight-bold align-self-center">
            Please enter your new password.
          </h2>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="newPassword"
                id="newPassword"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-success">Submit</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserNewPassword;
