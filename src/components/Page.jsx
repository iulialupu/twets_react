import React from "react";
import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/themeContext";

import TopNav from "./TopNav";

function Page({ children }) {
  const { color, theme } = useContext(ThemeContext);
  return (
    <>
      <TopNav />
      <Main theme={theme}>
        <Container color={color}>{children}</Container>
      </Main>
    </>
  );
}

export default Page;

const Main = styled.main`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.primaryText};
  font-size: 14px;
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
`;

const Container = styled.div`
  border-left: 1px solid ${({ color }) => color.darkGrey};
  border-right: 1px solid ${({ color }) => color.darkGrey};
  width: 70%;
  min-height: 100vh;
  margin: 0 auto;
  padding: 0;
  padding-bottom: 40px;
  max-width: 1000px;
`;
