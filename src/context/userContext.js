import React, { createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const UserContext = createContext({});

const initialState = {
  isAuthenticated: false,
  userInfo: "",
};

// check if there is token, it's not expired,
// and set user initial state
const token = localStorage.getItem("jwtToken");
console.log("!", { token });
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.userInfo = decodedToken;
    initialState.isAuthenticated = true;
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, isAuthenticated: true, userInfo: action.payload };
    case "LOGOUT_USER":
      return { ...state, isAuthenticated: false, userInfo: {} };
    default:
      return state;
  }
};

export function UserContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const login = (authData) => {
    // 1. decode token
    const decodedToken = jwtDecode(authData.token);
    console.log({ decodedToken });
    // 2. set user info
    dispatch({ type: "LOGIN_USER", payload: decodedToken });
    // 3. set token to local storage
    localStorage.setItem("jwtToken", authData.token);
    // 4. redirect to home
    history.push("/");
  };
  const logout = () => {
    // 1. clear user
    dispatch({ type: "LOGOUT_USER" });
    // 2. remove token
    localStorage.removeItem("jwtToken");
    // 3. history.push "/" or "/login" ?  refresh page
  };
  return (
    <UserContext.Provider {...props} value={{ ...state, login, logout }} />
  );
}
