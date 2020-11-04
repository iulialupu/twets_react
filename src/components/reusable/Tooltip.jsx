import React, { useState, useContext } from "react";
import styled from "styled-components";

import { ThemeContext } from "../../context/themeContext";

function Tooltip({ children, content }) {
  const { color, theme } = useContext(ThemeContext);
  return (
    <StyledTooltip>
      {children}
      <Content color={color} theme={theme}>
        {content}
      </Content>
    </StyledTooltip>
  );
}

export default Tooltip;

const Content = styled.div`
  visibility: hidden;
  background-color: ${({ theme }) => theme.background};
  box-shadow: 1px 1px 2px 1px ${({ color }) => color.darkGrey},
    0 0 5px 6px ${({ color }) => color.lightGrey};
  color: ${({ theme }) => theme.secondaryText};
  text-align: center;
  font-size: 12px;
  white-space: nowrap;
  border-radius: 4px;
  padding: 2px 10px 3px;
  position: absolute;
  z-index: 1;
  transform: translate(-30%, -10%);
  transition: visibility 0.3s fade-in;
`;

const StyledTooltip = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${Content} {
    visibility: visible;
  }
`;
