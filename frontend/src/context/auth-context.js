import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  admin: () => {},
  handleName: () => {},
  isAdmin: false,
  name: "",
});
