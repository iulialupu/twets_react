import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

function Home() {
  const { userInfo, isAuthenticated, logout } = useContext(UserContext);
  console.log({ userInfo, isAuthenticated });
  if (!isAuthenticated)
    return (
      <div>
        Please login <Link to="/login">Login page</Link>
      </div>
    );
  if (isAuthenticated)
    return (
      <div>
        welcome, {userInfo.username}, {userInfo.id}
        <button onClick={logout}>Log out</button>
      </div>
    );
}

export default Home;
