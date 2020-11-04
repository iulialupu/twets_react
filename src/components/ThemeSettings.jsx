import React, { useContext } from "react";
import styled from "styled-components";

import { ThemeContext, HUES } from "../context/themeContext";

function ThemeSettings() {
  const { changeColor, changeTheme, chosen, color, theme } = useContext(
    ThemeContext
  );
  return (
    <>
      <Header>Theme Settings</Header>
      <Label>Chose main color</Label>
      {Object.entries(HUES).map(([hueName, hueValue]) => (
        <ColorInputContainer key={hueName} hue={hueValue}>
          <ColorInput
            type="radio"
            id={hueName}
            name="color"
            value={hueName}
            checked={chosen.color === hueName}
            onChange={(e) => changeColor(e.target.value)}
          />
          <ColorCircle hue={hueValue} color={color} />
          <CenterDot theme={theme} />
        </ColorInputContainer>
      ))}

      <Label>Select theme</Label>
      {["light", "dark"].map((themeName) => (
        <>
          <ThemeInput
            key={themeName}
            type="radio"
            id={themeName}
            name="theme"
            value={themeName}
            checked={chosen.theme === themeName}
            onChange={(e) => changeTheme(e.target.value)}
          />
          <label htmlFor={themeName}>
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </label>
          <br />
        </>
      ))}
    </>
  );
}

export default ThemeSettings;

const Header = styled.h4`
  margin: 0;
`;

const Label = styled.p`
  text-align: left;
  margin: 5px 0;
`;

const ColorInputContainer = styled.label`
  margin: 0;
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  user-select: none;
`;

const ColorCircle = styled.span`
  position: absolute;
  top: 4px;
  left: 0;
  height: 15px;
  width: 15px;
  background-color: hsl(${({ hue }) => hue}, 89%, 53%);
  border-radius: 50%;
  &: hover {
    box-shadow: 0 0 3px 4px ${({ color }) => color.darkGrey};
  }
`;

const CenterDot = styled.span`
  content: "";
  position: absolute;
  display: none;
  top: 8px;
  left: 4px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ theme }) => theme.background};
`;

const ColorInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  &:checked ~ ${CenterDot} {
    display: block;
  }
`;

const ThemeInput = styled.input`
  margin-right: 8px;
`;
