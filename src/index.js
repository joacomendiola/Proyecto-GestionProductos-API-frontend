import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/poppins"; // Tipografía Poppins

// Tema personalizado (violeta + tipografía Poppins)
const theme = createTheme({
  palette: {
    primary: {
      main: "#7c3aed" // violeta
    },
    secondary: {
      main: "#9333ea" // violeta intenso
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif"
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
