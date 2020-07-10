import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import NavBar from "../../navigation/NavBar.component";
import UserNewPassword from "./user-newpassword";

const UserResetPassword = () => {
  const [email, setEmail] = useState("");
  const [display, setDisplay] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const submitEmailHandler = async (event) => {
    event.preventDefault();
    await axios({
      method: "GET",
      data: { email },
      withCredentials: true,
      url: `http://localhost:5000/api/user/`,
    }).then((res) => {
      if (res) {
        setDisplay(true);
      } else {
        setNotFound(true);
      }
    });
  };

  return (
    <React.Fragment>
      <NavBar />
      {!display && (
        <div className="container" style={{ marginTop: "2rem" }}>
          <div className="row w-100 h-100 flex-column">
            <h2 className="font-weight-bold align-self-center">
              Please enter your email address.
            </h2>
            <form onSubmit={submitEmailHandler}>
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-success">Submit</button>
            </form>
            {notFound && (
              <p className="text-danger">
                There is no user registered with provided email.
              </p>
            )}
          </div>
        </div>
      )}
      {display && <UserNewPassword email={email} />}
    </React.Fragment>
  );
};

export default UserResetPassword;
