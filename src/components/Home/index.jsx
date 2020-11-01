import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../../context/userContext";
import { theme } from "../../cssVariables";

const colorVersions = [
  "primary",
  "hover",
  "disabled",
  "secondary",
  "lightGrey",
  "darkGrey",
];

const colorHues = ["blue", "orange", "yellow", "green", "red", "purple"];

function Home() {
  const { userInfo, isAuthenticated, logout } = useContext(UserContext);
  const [theme, setTheme] = useState("dark");
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
        <button
          onClick={() => setTheme((s) => (s === "dark" ? "light" : "dark"))}
        >
          Change theme
        </button>
        <div
          style={{
            backgroundColor: theme[theme].background,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {colorHues.map((hue, index) => (
            <ol key={index}>
              {colorVersions.map((version, i) => (
                <li key={i}>
                  <Box color={hue} version={version} />
                  <h3 style={{ color: theme[theme].primaryText, margin: 0 }}>
                    {hue}
                  </h3>
                  <p style={{ color: theme[theme].primaryText }}>{version}</p>
                  <span style={{ color: theme[theme].secondaryText }}>
                    {version}
                  </span>
                </li>
              ))}
            </ol>
          ))}
        </div>
      </div>
    );
}

export default Home;

const Box = styled.div`
  width: 50px;
  height: 50px;
  display: inline-block;
  background-color: ${({ color, version }) => theme[color][version]};
`;
