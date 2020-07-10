import React from "react";
import { Link } from "react-router-dom";

import "../../stylesheets/main.css";

const Home = (props) => {
  return (
    <div>
      <div id="landing-header">
        <h1>Welcome to Storyboard!</h1>
        <Link to="/story" className="btn btn-lg btn-success">
          View All Story
        </Link>
      </div>

      <ul className="slideshow">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default Home;
