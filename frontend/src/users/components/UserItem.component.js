import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserItem = (props) => {
  return (
    <div className="container mb-4">
      <h3>List of our contributors!</h3>
      <div>
        {props.users.map((user) => (
          <div className="card p-4 my-2">
            <Link to={`/user/${user}`}>
              <h4>{user}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserItem;
