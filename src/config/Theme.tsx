import React from "react";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  CssBaseline,
  MuiThemeProvider,
} from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1d3557",
    },
    secondary: {
      main: "#a8dadc",
    },
  },
  typography: {
    fontFamily: "Cairo",
  },
  direction: "rtl",
});

interface Props {}

const ThemeProvidor: React.FC<Props> = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvidor;
