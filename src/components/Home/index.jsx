import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../../context/userContext";
import { themes } from "../../cssVariables";
import Page from "../Page";

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
  if (!isAuthenticated)
    return (
      <Page>
        Please login <Link to="/login">Login page</Link>
      </Page>
    );
  if (isAuthenticated)
    return (
      <Page>
        <button
          onClick={() => setTheme((s) => (s === "dark" ? "light" : "dark"))}
        >
          Change theme
        </button>
        <div
          style={{
            backgroundColor: themes[theme].background,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {colorHues.map((hue, index) => (
            <ol key={index}>
              {colorVersions.map((version, i) => (
                <li key={i}>
                  <Box color={hue} version={version} />
                  <h3 style={{ color: themes[theme].primaryText, margin: 0 }}>
                    {hue}
                  </h3>
                  <p style={{ color: themes[theme].primaryText }}>{version}</p>
                  <span style={{ color: themes[theme].secondaryText }}>
                    {version}
                  </span>
                </li>
              ))}
            </ol>
          ))}
        </div>
      </Page>
    );
}

export default Home;

const Box = styled.div`
  width: 50px;
  height: 50px;
  display: inline-block;
  background-color: ${({ color, version }) => themes[color][version]};
`;
