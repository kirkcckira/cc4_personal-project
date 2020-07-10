import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth-context";

const NavBar = (props) => {
  const auth = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [story, setStory] = useState([]);

  const logOutHandler = () => {
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5000/api/user/logout",
    });
    auth.logout();
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios({
      method: "POST",
      data: { query: search },
      withCredentials: true,
      url: "http://localhost:5000/api/story/search/",
    }).then((res) => {
      setStory(res.data);
      console.log(res.data);
      setRedirect(true);
    });
  };

  return (
    <React.Fragment>
      {redirect && (
        <Redirect to={{ pathname: "/story", state: { story, search } }} />
      )}
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
          <Link className="navbar-brand" to="/">
            Storyboard
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/story">
                  Stories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user">
                  Contributers
                </Link>
              </li>
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Look for stories..."
                  aria-label="Search"
                  name="query"
                  id="query"
                  onChange={(e) => setSearch(e.target.value)}
                  onSubmit={submitHandler}
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="button"
                  onClick={submitHandler}
                >
                  Search
                </button>
              </form>
            </ul>
            <ul className="nav navbar-right nav-pills">
              {!auth.isLoggedIn && (
                <React.Fragment>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-primary"
                      to="/login"
                      role="button"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-success"
                      to="/user/signup"
                      role="button"
                    >
                      Sign Up
                    </Link>
                  </li>
                </React.Fragment>
              )}
              {auth.isLoggedIn && (
                <React.Fragment>
                  <li className="nav-item mx-2">
                    <Link className="nav-link active" to="/story/new">
                      New Story!
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-primary"
                      to={`/user/${auth.name}`}
                    >
                      Hello! {auth.name}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-danger"
                      role="button"
                      to="#"
                      onClick={logOutHandler}
                    >
                      Logout
                    </Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
