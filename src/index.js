import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/poppins"; 

const theme = createTheme({
  palette: {
    primary: { main: "#7c3aed" },     // violeta
    secondary: { main: "#9333ea" },   // violeta intenso
    error: { main: "#dc2626" }
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif"
  },
  shape: { borderRadius: 12 }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
