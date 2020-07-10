import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import NavBar from "../../navigation/NavBar.component";
import StoryItem from "../../stories/components/StoryItem.component";

const StoryTag = () => {
  const [allStory, setAllStory] = useState([]);

  const tagName = useParams().tagName;

  let url = `http://localhost:5000/api/story/tag/${tagName}`;

  useEffect(() => {
    fetchData(url);
  }, []);

  const fetchData = async (url) => {
    const data = await axios({
      method: "GET",
      url,
    });
    setAllStory(data.data.allStory);
    console.log(data.data.allStory);
  };

  return (
    <React.Fragment>
      <NavBar />
      <div>
        <h2 className="fond-weight-bold text-center">
          Showing all story with tag : {tagName}
        </h2>
        <StoryItem stories={allStory} />
      </div>
    </React.Fragment>
  );
};

export default StoryTag;
