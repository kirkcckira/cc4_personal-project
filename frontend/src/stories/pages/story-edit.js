import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";

import NavBar from "../../navigation/NavBar.component";
import { AuthContext } from "../../context/auth-context";

const StoryEdit = (props) => {
  const auth = useContext(AuthContext);
  const storyId = useParams().storyId;
  const [ready, setReady] = useState(false);
  const [story, setStory] = useState();
  const [tag, setTag] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newBody, setNewBody] = useState("");
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
    setTag(data.data.foundStory.tag.join());
    setReady(true);
    console.log(data.data.foundStory);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios({
      method: "PATCH",
      data: {
        title: newTitle,
        image: newImage,
        tag: newTag,
        body: newBody,
      },
      withCredentials: true,
      url: `http://localhost:5000/api/story/${storyId}`,
    }).then((res) => {
      console.log(res);
      setRedirect(true);
    });
  };

  return (
    <React.Fragment>
      <NavBar />
      {redirect && <Redirect to="/story" />}
      {ready && (
        <div className="container" style={{ marginTop: "2rem" }}>
          <div className="row w-100 h-100 flex-column">
            <h2 className="font-weight-bold align-self-center">
              Edit your story!
            </h2>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="title">Old Title : {story.title}</label>
                <input
                  className="form-control"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Required"
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="Images">
                  Old Images : {story.image.toString()}
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="image"
                  name="image"
                  placeholder="(Optional) e.g. http://www.url1.com,http://www.url2.com"
                  onChange={(e) => setNewImage(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="tag">Old Tags : {tag}</label>
                <input
                  className="form-control"
                  type="text"
                  id="tag"
                  name="tag"
                  placeholder="(Optional) e.g. funny,happy,short"
                  onChange={(e) => setNewTag(e.target.value)}
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="body">Old Story :</label>
                <textarea
                  className="form-control mb-2"
                  row="10"
                  col="50"
                  disabled
                >
                  {story.body}
                </textarea>
                <textarea
                  className="form-control"
                  row="10"
                  col="50"
                  id="body"
                  name="body"
                  placeholder="Required"
                  onChange={(e) => setNewBody(e.target.value)}
                  required
                ></textarea>
              </div>
              <input className="btn btn-success" type="submit" value="Submit" />
            </form>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default StoryEdit;
