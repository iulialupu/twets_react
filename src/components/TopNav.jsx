import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/themeContext";

function TopNav() {
  const { color, theme } = useContext(ThemeContext);
  return (
    <Nav color={color} theme={theme}>
      TopNav
    </Nav>
  );
}

export default TopNav;

const Nav = styled.nav`
  padding: 5px;
  margin: 0;
  border-bottom: 1px solid ${({ color }) => color.lightGrey};
  backgroundcolor: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.primaryText};
`;
