import React, { useContext } from "react";
import styled from "styled-components";
import Popover from "react-awesome-popover";

import { ThemeContext } from "../../context/themeContext";

function CustomPopover({ trigger, content }) {
  const { color, theme } = useContext(ThemeContext);
  return (
    <Popover placement="bottom-end" arrow={false} overlayColor="transparent">
      {trigger}
      <StyledPopover color={color} theme={theme}>
        {content}
      </StyledPopover>
    </Popover>
  );
}

export default CustomPopover;

const StyledPopover = styled.div`
  background-color: ${({ theme }) => theme.background};
  box-shadow: 1px 1px 2px 1px ${({ color }) => color.darkGrey},
    0 0 5px 6px ${({ color }) => color.lightGrey};
  color: ${({ theme }) => theme.secondaryText};
  text-align: center;
  font-size: 14px;
  white-space: nowrap;
  border-radius: 4px;
  padding: 12px 16px;
  text-align: left;
  margin-right: 5px;
`;
