export const colors = {
  blue: "#1DA1F2",
  hoverBlue: "#1A91DA",
  lightBlue: "#71C9F8",
  disabledBlue: "#8ED0F9",
  lightBlueBg: "#F5F8FA",
  grey: "#657786",
  red: "#ff454b",
};

const blueHSL = {
  h: 203,
  s: 89,
  l: 53,
};

const orangeHSL = {
  h: 40,
  s: 85,
  l: 53,
};

const redHSL = {
  h: 0,
  s: 85,
  l: 53,
};

const greenHSL = {
  h: 145,
  s: 85,
  l: 53,
};

const purpleHSL = {
  h: 282,
  s: 85,
  l: 53,
};

const yellowHSL = {
  h: 70,
  s: 85,
  l: 53,
};

export const themes = {
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
  orange: {
    primary: `hsl(${orangeHSL.h}, 89%, 53%)`,
    hover: `hsl(${orangeHSL.h}, 79%, 48%)`,
    disabled: `hsla(${orangeHSL.h}, 65%, 53%, 0.65)`,
    secondary: `hsl(${orangeHSL.h}, 91%, 71%)`,
    lightGrey: `hsla(${orangeHSL.h}, 42%, 53%, 0.1)`,
    darkGrey: `hsla(${orangeHSL.h}, 50%, 53%, 0.2)`,
  },
  blue: {
    primary: `hsl(${blueHSL.h}, 89%, 53%)`,
    hover: `hsl(${blueHSL.h}, 79%, 48%)`,
    disabled: `hsla(${blueHSL.h}, 65%, 53%, 0.65)`,
    secondary: `hsl(${blueHSL.h}, 91%, 71%)`,
    lightGrey: `hsla(${blueHSL.h}, 42%, 53%, 0.1)`,
    darkGrey: `hsla(${blueHSL.h}, 50%, 53%, 0.2)`,
  },

  red: {
    primary: `hsl(${redHSL.h}, 89%, 53%)`,
    hover: `hsl(${redHSL.h}, 79%, 48%)`,
    disabled: `hsla(${redHSL.h}, 65%, 53%, 0.65)`,
    secondary: `hsl(${redHSL.h}, 91%, 71%)`,
    lightGrey: `hsla(${redHSL.h}, 42%, 53%, 0.1)`,
    darkGrey: `hsla(${redHSL.h}, 50%, 53%, 0.2)`,
  },

  green: {
    primary: `hsl(${greenHSL.h}, 89%, 53%)`,
    hover: `hsl(${greenHSL.h}, 79%, 48%)`,
    disabled: `hsla(${greenHSL.h}, 65%, 53%, 0.65)`,
    secondary: `hsl(${greenHSL.h}, 91%, 71%)`,
    lightGrey: `hsla(${greenHSL.h}, 42%, 53%, 0.1)`,
    darkGrey: `hsla(${greenHSL.h}, 50%, 53%, 0.2)`,
  },

  purple: {
    primary: `hsl(${purpleHSL.h}, 89%, 53%)`,
    hover: `hsl(${purpleHSL.h}, 79%, 48%)`,
    disabled: `hsla(${purpleHSL.h}, 65%, 53%, 0.65)`,
    secondary: `hsl(${purpleHSL.h}, 91%, 71%)`,
    lightGrey: `hsla(${purpleHSL.h}, 42%, 53%, 0.1)`,
    darkGrey: `hsla(${purpleHSL.h}, 50%, 53%, 0.2)`,
  },

  yellow: {
    primary: `hsl(${yellowHSL.h}, 89%, 53%)`,
    hover: `hsl(${yellowHSL.h}, 79%, 48%)`,
    disabled: `hsla(${yellowHSL.h}, 65%, 53%, 0.65)`,
    secondary: `hsl(${yellowHSL.h}, 91%, 71%)`,
    lightGrey: `hsla(${yellowHSL.h}, 42%, 53%, 0.1)`,
    darkGrey: `hsla(${yellowHSL.h}, 50%, 53%, 0.2)`,
  },
};
