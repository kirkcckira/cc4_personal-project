import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import NavBar from "../navigation/NavBar.component";
import { AuthContext } from "../context/auth-context";

const NewComment = () => {
  const auth = useContext(AuthContext);
  const storyId = useParams().storyId;
  const [comment, setComment] = useState("");
  const [commentator, setCommentator] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submitHandler = async (event) => {
    let data;
    if (!auth.isLoggedIn) {
      data = {
        comment,
        commentator,
      };
    } else {
      data = { comment };
    }
    console.log(data);
    event.preventDefault();
    await axios({
      method: "POST",
      data,
      withCredentials: true,
      url: `http://localhost:5000/api/story/${storyId}/comment`,
    }).then((res) => {
      console.log(res);
      setRedirect(true);
    });
  };

  return (
    <React.Fragment>
      {redirect && <Redirect to={`/story/${storyId}`} />}
      <NavBar />
      <div className="container" style={{ marginTop: "2rem" }}>
        <div className="row w-100 h-100 flex-column">
          <h2 className="font-weight-bold align-self-center">
            Add Your Comment!
          </h2>
          <form onSubmit={submitHandler}>
            <div className="form-group">
              <textarea
                className="form-control"
                type="text"
                name="comment"
                id="comment"
                onChange={(e) => setComment(e.target.value)}
                placeholder="What do you think?"
                rows="5"
                required
              ></textarea>
            </div>
            {!auth.isLoggedIn && (
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="commentator"
                  id="commentator"
                  onChange={(e) => setCommentator(e.target.value)}
                  placeholder="Your handle name"
                  required
                />
              </div>
            )}
            <button className="btn btn-success">Add a comment</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewComment;
