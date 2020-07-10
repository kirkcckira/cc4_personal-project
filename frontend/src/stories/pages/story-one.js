import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../../context/auth-context";

const moment = require("moment");

const StoryOne = (props) => {
  const auth = useContext(AuthContext);
  const storyId = useParams().storyId;

  const commentHandleDelete = async (commentId) => {
    await axios({
      method: "DELETE",
      withCredentials: true,
      url: `http://localhost:5000/api/story/${storyId}/${commentId}`,
    });
  };

  const needAutho = (
    <React.Fragment>
      <div className="row mt-3">
        <div className="col">
          <Link to={`/story/${props.story._id}/edit`}>
            <button className="btn btn-warning">EDIT</button>
          </Link>
          <Link to="#">
            <button className="btn btn-danger ml-3">DELETE</button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <div className="container mt-3">
        <div className="card px-4 py-2 my-2">
          <div className="row my-3">
            <h3 className="m-auto font-weight-bold">{props.story.title}</h3>
          </div>
          <div className="row">
            <div
              className="container"
              style={{ maxWidth: "700px", maxHeight: "500px" }}
            >
              <img
                src={props.story.image[0]}
                className="img-fluid img-thumbnail mh-100 d-block mx-auto"
                alt=""
              />
            </div>
          </div>
          <div className="row my-3">
            <div className="col">
              Posted Date :{" "}
              {moment(props.story.createdDate).format("dddd, MMMM Do YYYY")}
              <span className="mx-3">
                By{" "}
                <Link
                  to={`/user/${props.story.author.name}`}
                  style={{ textDecoration: "none" }}
                >
                  {props.story.author.name}
                </Link>
              </span>
            </div>
          </div>
          {props.story.tag && (
            <div className="row">
              <div className="col">
                <span>Tags: </span>
                {props.story.tag.map((tag) => (
                  <Link to={`/story/tag/${tag}`} className="mx-1">
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {auth.name === props.story.author.name
            ? needAutho
            : auth.isAdmin
            ? needAutho
            : null}
          <div className="row mt-3">
            <div className="col">
              <p>{props.story.body}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-3">
        <div className="text-right mb-3">
          <Link
            className="btn btn-success"
            to={`/story/${props.story._id}/comment/new`}
          >
            Add a comment
          </Link>
        </div>
        <div className="card px-4 py-2 my-2">
          {props.story.comments.map((comment) => (
            <React.Fragment>
              <div className="row my-3">
                <div className="col">
                  <p>{comment.comment}</p>
                  {comment.commentator ? (
                    <p>
                      By{" "}
                      <span className="font-weight-bold">
                        {comment.commentator}
                      </span>
                    </p>
                  ) : (
                    <React.Fragment>
                      <p>
                        By{" "}
                        <span className="font-weight-bold">
                          {comment.author.name}
                        </span>
                      </p>
                      {auth.name === comment.author.name ? (
                        <React.Fragment>
                          <div className="row mt-3">
                            <div className="col">
                              <Link
                                to={`/story/${props.story._id}/comment/${comment._id}/edit`}
                              >
                                <button className="btn btn-warning">
                                  EDIT
                                </button>
                              </Link>
                              <button
                                className="btn btn-danger ml-3"
                                onClick={() => commentHandleDelete(comment._id)}
                              >
                                DELETE
                              </button>
                            </div>
                          </div>
                        </React.Fragment>
                      ) : auth.isAdmin ? (
                        <React.Fragment>
                          <div className="row my-3">
                            <div className="col">
                              <Link
                                to={`/story/${props.story._id}/comment/${comment._id}/edit`}
                              >
                                <button className="btn btn-warning">
                                  EDIT
                                </button>
                              </Link>
                              <button
                                className="btn btn-danger ml-3"
                                onClick={() => commentHandleDelete(comment._id)}
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
      </div>
    </React.Fragment>
  );
};

export default StoryOne;
