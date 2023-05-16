import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#2da77a",
    },
    secondary: {
      main: "#faf9fa",
    },
    background: {
      default: "#faf9fa",
    },
    text: {
      primary: "#0f0b0f",
    },
  },
  typography: {
    fontFamily: "font-family: 'Montserrat', sans-serif;",
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01562em",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.00833em",
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "0em",
      lineHeight: 1.2,
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#2da77a",
    },
    secondary: {
      main: "#0c030c",
    },
    background: {
      default: "#0c030c",
    },
    text: {
      primary: "#faf9fa",
    },
  },
  typography: {
    fontFamily: "font-family: 'Montserrat', sans-serif;",
    fontSize: 16,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: "3.5rem",
      fontWeight: 700,
      letterSpacing: "-0.01562em",
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.00833em",
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 700,
      letterSpacing: "0em",
      lineHeight: 1.2,
    },
  },
});
