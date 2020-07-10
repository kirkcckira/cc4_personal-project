import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import NavBar from "../../navigation/NavBar.component";

import { AuthContext } from "../../context/auth-context";

const moment = require("moment");

const StoryShow = () => {
  const auth = useContext(AuthContext);
  const [story, setStory] = useState([]);
  const [ready, setReady] = useState(false);
  const storyId = useParams().storyId;
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await axios({
      method: "GET",
      url: `http://localhost:5000/api/story/${storyId}`,
    });
    setStory(data.data.foundStory);
    console.log(data.data.foundStory);
    setReady(true);
  };

  const commentHandleDelete = async (commentId) => {
    await axios({
      method: "DELETE",
      withCredentials: true,
      url: `http://localhost:5000/api/story/${storyId}/${commentId}`,
    });
    fetchData();
  };

  const storyHandleDelete = async (commentId) => {
    await axios({
      method: "DELETE",
      withCredentials: true,
      url: `http://localhost:5000/api/story/${storyId}`,
    });
    setRedirect(true);
  };

  const needAutho = (
    <React.Fragment>
      <div className="row mt-3">
        <div className="col">
          <Link to={`/story/${story._id}/edit`}>
            <button className="btn btn-warning">EDIT</button>
          </Link>
          <button className="btn btn-danger ml-3" onClick={storyHandleDelete}>
            DELETE
          </button>
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <NavBar />
      {redirect && <Redirect to="/story" />}
      {ready && (
        <React.Fragment>
          <div className="container mt-3">
            <div className="card px-4 py-2 my-2">
              <div className="row my-3">
                <h3 className="m-auto font-weight-bold">{story.title}</h3>
              </div>
              <div className="row">
                <div
                  className="container"
                  style={{ maxWidth: "700px", maxHeight: "500px" }}
                >
                  {story.image && (
                    <img
                      src={story.image[0]}
                      className="img-fluid img-thumbnail mh-100 d-block mx-auto"
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div className="row my-3">
                <div className="col">
                  Posted Date :{" "}
                  {moment(story.createdDate).format("dddd, MMMM Do YYYY")}
                  <span className="mx-3">
                    By{" "}
                    <Link
                      to={`/user/${story.author.name}`}
                      style={{ textDecoration: "none" }}
                    >
                      {story.author.name}
                    </Link>
                  </span>
                </div>
              </div>
              {story.tag && (
                <div className="row">
                  <div className="col">
                    <span>Tags: </span>
                    {story.tag.map((tag) => (
                      <Link to={`/story/tag/${tag}`} className="mx-1">
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {auth.name === story.author.name
                ? needAutho
                : auth.isAdmin
                ? needAutho
                : null}
              <div className="row mt-3">
                <div className="col">
                  <p>{story.body}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container mt-3">
            <div className="text-right mb-3">
              <Link
                className="btn btn-success"
                to={`/story/${story._id}/comment/new`}
              >
                Add a comment
              </Link>
            </div>
            {story.comments.length > 0 && (
              <div className="card px-4 py-2 my-2">
                {story.comments.map((comment) => (
                  <React.Fragment>
                    <div className="row my-3">
                      <div className="col">
                        <p>{comment.comment}</p>
                        {comment.commentator ? (
                          <React.Fragment>
                            <p>
                              By{" "}
                              <span className="font-weight-bold">
                                {comment.commentator}
                              </span>
                            </p>
                            {auth.isAdmin && (
                              <React.Fragment>
                                <div className="row mt-3">
                                  <div className="col">
                                    <Link
                                      to={`/story/${story._id}/comment/${comment._id}/edit`}
                                    >
                                      <button className="btn btn-warning">
                                        EDIT
                                      </button>
                                    </Link>
                                    <button
                                      className="btn btn-danger ml-3"
                                      onClick={() =>
                                        commentHandleDelete(comment._id)
                                      }
                                    >
                                      DELETE
                                    </button>
                                  </div>
                                </div>
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <p>
                              By{" "}
                              <span className="font-weight-bold">
                                <Link to={`/user/${comment.author.name}`}>
                                  {comment.author.name}
                                </Link>
                              </span>
                            </p>
                            {auth.name === comment.author.name ? (
                              <React.Fragment>
                                <div className="row mt-3">
                                  <div className="col">
                                    <Link
                                      to={`/story/${story._id}/comment/${comment._id}/edit`}
                                    >
                                      <button className="btn btn-warning">
                                        EDIT
                                      </button>
                                    </Link>
                                    <button
                                      className="btn btn-danger ml-3"
                                      onClick={() =>
                                        commentHandleDelete(comment._id)
                                      }
                                    >
                                      DELETE
                                    </button>
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : auth.isAdmin ? (
                              <React.Fragment>
                                <div className="row mt-3">
                                  <div className="col">
                                    <Link
                                      to={`/story/${story._id}/comment/${comment._id}/edit`}
                                    >
                                      <button className="btn btn-warning">
                                        EDIT
                                      </button>
                                    </Link>
                                    <button
                                      className="btn btn-danger ml-3"
                                      onClick={() =>
                                        commentHandleDelete(comment._id)
                                      }
                                    >
                                      DELETE
                                    </button>
                                  </div>
                                </div>
                              </React.Fragment>
                            ) : null}
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                    <hr className="my-0" />
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default StoryShow;
