import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Home from "./home/pages/home";
import User from "./users/pages/user";
import UserSignUp from "./users/pages/user-signup";
import UserLogin from "./users/pages/user-login";
import Story from "./stories/pages/story";
import StoryNew from "./stories/pages/story-new";
import StoryEdit from "./stories/pages/story-edit";
import StoryTag from "./stories/pages/story-tag";
import StoryShow from "./stories/pages/story-show";
import { AuthContext } from "./context/auth-context";
import NewComment from "./comment/comment-new";
import CommentEdit from "./comment/comment-edit";
import UserResetPassword from "./users/pages/user-reset";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [name, setName] = useState("");

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  }, []);

  const admin = useCallback(() => {
    setIsAdmin(true);
  }, []);

  const handleName = useCallback((data) => {
    setName(data);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user" exact component={User} />
        <Route path="/user/:name" component={Story} />
        <Route path="/story" exact component={Story} />
        <Route path="/story/new" exact component={StoryNew} />
        <Route path="/story/tag/:tagName" exact component={StoryTag} />
        <Route
          path="/story/:storyId/comment/new"
          exact
          component={NewComment}
        />
        <Route
          path="/story/:storyId/comment/:commentId/edit"
          exact
          component={CommentEdit}
        />
        <Route path="/story/:storyId/edit" exact component={StoryEdit} />
        <Route path="/story/:storyId" component={StoryShow} />
        <Redirect to="/story" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/user" exact component={User} />
        <Route path="/user/reset" exact component={UserResetPassword} />
        <Route path="/user/signup" exact component={UserSignUp} />
        <Route path="/user/:name" component={Story} />
        <Route path="/login" component={UserLogin} />
        <Route path="/story" exact component={Story} />
        <Route
          path="/story/:storyId/comment/new"
          exact
          component={NewComment}
        />
        <Route
          path="/story/:storyId/comment/:commentId/edit"
          exact
          component={CommentEdit}
        />
        <Route path="/story/tag/:tagName" exact component={StoryTag} />
        <Route path="/story/new" exact component={UserLogin} />
        <Route path="/story/:storyId" component={StoryShow} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        name: name,
        handleName: handleName,
        admin: admin,
        isAdmin: isAdmin,
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};

export default App;
