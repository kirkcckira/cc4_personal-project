import React from "react";
import { Link } from "react-router-dom";

const moment = require("moment");

const StoryItem = (props) => {
  return (
    <div className="container mb-4 mt-3">
      {props.stories.map((item) => (
        <React.Fragment>
          <div className="card px-4 py-2 my-2">
            <div className="row my-3">
              <h2 className="m-auto font-weight-bold">{item.title}</h2>
            </div>
            {item.image && (
              <div className="row">
                <div
                  className="container"
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                >
                  <img
                    src={item.image[0]}
                    className="img-fluid img-thumbnail mh-100 d-block mx-auto"
                    alt=""
                  />
                </div>
              </div>
            )}
            <div className="row my-3">
              <div className="col">
                <span>
                  Posted Date :{" "}
                  {moment(item.createdDate).format("dddd, MMMM Do YYYY")}
                </span>
                <span className="mx-3">
                  By{" "}
                  <Link
                    to={`/user/${item.author.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    {item.author.name}
                  </Link>
                </span>
              </div>
            </div>
            {item.tag && (
              <div className="row">
                <div className="col">
                  <span>Tags: </span>
                  {item.tag.map((tag) => (
                    <Link to={`/story/tag/${tag}`} className="mx-1">
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="row mt-3">
              <div className="col">
                <p>{item.body.substring(0, 150)}...</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Link to={`/story/${item._id}`}>Read More</Link>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StoryItem;
