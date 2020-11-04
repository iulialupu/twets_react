import React, { createContext, useEffect, useState } from "react";

const DEFAULT_COLOR = "yellow";
const DEFAULT_THEME = "dark";

export const HUES = {
  blue: 203,
  orange: 40,
  red: 0,
  green: 145,
  purple: 282,
  yellow: 70,
};

const getColors = (hue) => ({
  primary: `hsl(${hue}, 89%, 53%)`,
  hover: `hsl(${hue}, 79%, 48%)`,
  disabled: `hsla(${hue}, 65%, 53%, 0.65)`,
  secondary: `hsl(${hue}, 91%, 71%)`,
  lightGrey: `hsla(${hue}, 42%, 53%, 0.1)`,
  darkGrey: `hsla(${hue}, 50%, 53%, 0.2)`,
});

const THEMES = {
  light: {
    background: "#fff",
    primaryText: "#000",
    secondaryText: "#7a7f82",
  },
  dark: {
    background: "#000",
    primaryText: "#fff",
    secondaryText: "#7a7f82",
  },
};

const initialState = {
  chosen: {
    color: DEFAULT_COLOR,
    theme: DEFAULT_THEME,
  },
  color: getColors(HUES[DEFAULT_COLOR]),
  theme: THEMES[DEFAULT_THEME],
};

const lSColorTheme = localStorage.getItem("color-theme");
if (lSColorTheme) {
  const lSChosenObj = JSON.parse(lSColorTheme);
  initialState.chosen = lSChosenObj;
  initialState.color = getColors(HUES[lSChosenObj.color]);
  initialState.theme = THEMES[lSChosenObj.theme];
}

export const ThemeContext = createContext({
  ...initialState,
  changeColor: () => {},
  changeTheme: () => {},
});

export function ThemeContextProvider(props) {
  const [state, setState] = useState(initialState);

  const changeColor = (chosenColor) =>
    setState((s) => ({
      ...s,
      chosen: { ...s.chosen, color: chosenColor },
      color: getColors(HUES[chosenColor]),
    }));
  const changeTheme = (chosenTheme) =>
    setState((s) => ({
      ...s,
      chosen: { ...s.chosen, theme: chosenTheme },
      theme: THEMES[chosenTheme],
    }));

  useEffect(() => {
    localStorage.setItem("color-theme", JSON.stringify(state.chosen));
  }, [state.chosen.color, state.chosen.theme]);

  return (
    <ThemeContext.Provider
      {...props}
      value={{ ...state, changeColor, changeTheme }}
    />
  );
}
