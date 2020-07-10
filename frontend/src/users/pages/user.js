import React, { useState, useEffect } from "react";
import axios from "axios";

import NavBar from "../../navigation/NavBar.component";
import UserItem from "../../users/components/UserItem.component";

const User = (props) => {
  const [allContributer, setAllContributor] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await axios({
      method: "GET",
      url: "http://localhost:5000/api/user",
    });
    setAllContributor(data.data.allContributor);
    setReady(true);
  };

  return (
    <React.Fragment>
      <NavBar />
      {ready && <UserItem users={allContributer} />}
    </React.Fragment>
  );
};

export default User;
