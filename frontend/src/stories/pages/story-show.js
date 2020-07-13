import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import NavBar from "../../navigation/NavBar.component";

import { AuthContext } from "../../context/auth-context";
import { isElementOfType } from "react-dom/test-utils";

const moment = require("moment");

const StoryShow = () => {
  const auth = useContext(AuthContext);
  const [story, setStory] = useState([]);
  const [ready, setReady] = useState(false);
  const storyId = useParams().storyId;
  const [redirect, setRedirect] = useState(false);
  const [image, setImage] = useState();

  // let image;

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

    if (!data.data.foundStory.image) {
      setImage("");
      setReady(true);
    } else if (data.data.foundStory.image.length === 1) {
      setImage(
        <img
          src={data.data.foundStory.image[0]}
          className="img-fluid img-thumbnail mh-100 d-block mx-auto"
          alt="Image"
        />
      );
      setReady(true);
    } else {
      setImage(
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            {data.data.foundStory.image.map((image, i) => (
              <li
                key={i}
                className={i === 0 ? "active" : ""}
                data-target="#carouselExampleIndicators"
                data-slide-to={i}
              ></li>
            ))}
          </ol>
          <div className="carousel-inner">
            {data.data.foundStory.image.map((image, i) => (
              <div
                key={i}
                className={i === 0 ? "carousel-item active" : "carousel-item"}
              >
                <img
                  className="d-block mx-auto"
                  src={data.data.foundStory.image[i]}
                />
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span aria-hidden="true">
              <i
                className="fas fa-chevron-left carousel-control"
                style={{ color: "#0087ff" }}
              ></i>
            </span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span aria-hidden="true">
              <i
                className="fas fa-chevron-right carousel-control"
                style={{ color: "#0087ff" }}
              ></i>
            </span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      );
      setReady(true);
    }
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
                <div className="col">
                  <div className="container">{image}</div>
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
