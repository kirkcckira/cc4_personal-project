import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import NavBar from "../../navigation/NavBar.component";
import StoryItem from "../../stories/components/StoryItem.component";

const Story = (props) => {
  const [allStory, setAllStory] = useState([]);
  const name = useParams().name;

  let url;

  if (name) {
    url = `http://localhost:5000/api/user/${name}`;
  } else {
    url = "http://localhost:5000/api/story";
  }

  useEffect(() => {
    if (!name) {
      fetchData(url);
    } else {
      fetchData(url);
      console.log(name);
    }
  }, [name]);

  if (props.location.state) {
    return (
      <React.Fragment>
        <NavBar />
        <div>
          <h2 className="fond-weight-bold text-center">
            Showing all story the search query : {props.location.state.search}
          </h2>
          <StoryItem stories={props.location.state.story.allStory} />
        </div>
      </React.Fragment>
    );
  }

  const fetchData = async (url) => {
    const data = await axios({
      method: "GET",
      url,
    });
    setAllStory(data.data.allStory);
  };

  return (
    <React.Fragment>
      <NavBar />
      <div>
        {name && (
          <h2 className="fond-weight-bold text-center">
            Showing all story from {name}
          </h2>
        )}
        <StoryItem stories={allStory} />
      </div>
    </React.Fragment>
  );
};

export default Story;
