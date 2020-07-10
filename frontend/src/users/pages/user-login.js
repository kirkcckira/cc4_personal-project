import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import NavBar from "../../navigation/NavBar.component";
import { AuthContext } from "../../context/auth-context";

const UserLogin = (props) => {
  const auth = useContext(AuthContext);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [errorDisplay, setErrorDisplay] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios({
      method: "POST",
      data: {
        username,
        password,
      },
      withCredentials: true,
      url: "http://localhost:5000/api/user/login",
    })
      .then((res) => {
        console.log(res);
        auth.login();
        auth.handleName(res.data.loginUser.name);
        if (username === "admin") {
          console.log(username);
          auth.admin();
        }
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
        setErrorDisplay(true);
      });
  };

  return (
    <React.Fragment>
      <NavBar />
      {redirect && <Redirect to="/" />}
      <div className="container" style={{ marginTop: "2rem" }}>
        <div className="row w-100 h-100 flex-column">
          <h2 className="font-weight-bold align-self-center">
            Please Enter Your Credentials
          </h2>
          {errorDisplay && (
            <p className="text-danger font-weight-bold align-self-center">
              {error}
            </p>
          )}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                type="text"
                id="username"
                name="username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" value="Submit">
              Login
            </button>
            <Link className="text-primary mx-3" to="/user/reset" role="button">
              Forget Password?
            </Link>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserLogin;
