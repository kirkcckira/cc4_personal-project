import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import NavBar from "../../navigation/NavBar.component";

const UserSignUp = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setHandleName] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const [errorDisplay, setErrorDisplay] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios({
      method: "POST",
      data: {
        email,
        username,
        password,
        name,
        description,
      },
      withCredentials: true,
      url: "http://localhost:5000/api/user",
    })
      .then((res) => {
        console.log(res);
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
      {redirect && <Redirect to="/story" />}
      <div className="container" style={{ marginTop: "2rem" }}>
        <div className="row w-100 h-100 flex-column">
          <h2 className="font-weight-bold align-self-center">
            Please fill out your account's details
          </h2>
          {errorDisplay && (
            <p className="text-danger font-weight-bold align-self-center">
              {error}
            </p>
          )}
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="text"
                id="email"
                name="email"
                placeholder="(Required)"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                className="form-control"
                type="text"
                id="username"
                name="username"
                placeholder="(Required) Your Login name. No Space."
                required
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
                placeholder="(Required)"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Handle Name</label>
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                placeholder="(Required) How should we call you? No Space."
                required
                onChange={(e) => setHandleName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                row="30"
                col="50"
                id="description"
                name="description"
                placeholder="(Optional) Short description about yourself."
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button className="btn btn-success" value="Submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserSignUp;
