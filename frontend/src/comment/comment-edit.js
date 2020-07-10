import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

import NavBar from "../navigation/NavBar.component";

const CommentEdit = () => {
  const storyId = useParams().storyId;
  const commentId = useParams().commentId;
  const [ready, setReady] = useState(false);
  const [comment, setComment] = useState("");
  const [newComment, setNewComment] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await axios({
      method: "GET",
      url: `http://localhost:5000/api/story/${storyId}/${commentId}`,
    });
    setComment(data.data.foundComment);
    setReady(true);
    console.log(data.data.foundComment);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios({
      method: "PATCH",
      data: { newComment },
      withCredentials: true,
      url: `http://localhost:5000/api/story/${storyId}/${commentId}`,
    }).then((res) => {
      console.log(res);
      setRedirect(true);
    });
  };

  return (
    <React.Fragment>
      {redirect && <Redirect to={`/story/${storyId}`} />}
      <NavBar />
      {ready && (
        <div className="container" style={{ marginTop: "2rem" }}>
          <div className="row w-100 h-100 flex-column">
            <h2 className="font-weight-bold align-self-center">
              Edit Your Comment
            </h2>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="body">Old Comment :</label>
                <textarea className="form-control" row="5" col="50" disabled>
                  {comment.comment}
                </textarea>
                <textarea
                  className="form-control mt-2"
                  type="text"
                  name="comment"
                  id="comment"
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="What do you think?"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CommentEdit;
