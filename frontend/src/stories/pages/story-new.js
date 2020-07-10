import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import NavBar from "../../navigation/NavBar.component";

const StoryNew = (props) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState("");
  const [body, setBody] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios({
      method: "POST",
      data: {
        title,
        image,
        tag,
        body,
      },
      withCredentials: true,
      url: "http://localhost:5000/api/story",
    }).then((res) => {
      console.log(res);
      setRedirect(true);
    });
  };

  return (
    <React.Fragment>
      <NavBar />
      {redirect && <Redirect to="/story" />}
      <div className="container" style={{ marginTop: "2rem" }}>
        <div className="row w-100 h-100 flex-column">
          <h2 className="font-weight-bold align-self-center">
            Tell us about your story!
          </h2>

          <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                className="form-control"
                type="text"
                id="title"
                name="title"
                placeholder="Required"
                required
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="Images">Images</label>
              <input
                className="form-control"
                type="text"
                id="image"
                name="image"
                placeholder="(Optional) e.g. http://www.url1.com,http://www.url2.com"
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="tag">Tags</label>
              <input
                className="form-control"
                type="text"
                id="tag"
                name="tag"
                placeholder="(Optional) e.g. funny,happy,short"
                onChange={(e) => setTag(e.target.value)}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="body">Your Story</label>
              <textarea
                className="form-control"
                row="10"
                col="50"
                id="body"
                name="body"
                placeholder="Required"
                required
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>
            <input className="btn btn-success" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StoryNew;
