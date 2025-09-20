import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Typography, Box } from "@mui/material";
import Productos from "./Productos";
import Usuarios from "./Usuarios";
import "./App.css";

export default function App() {
  return (
    <Router>
      <AppBar position="sticky" color="primary" elevation={2}>
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Gestión Productos
          </Typography>
          <Button component={Link} to="/productos" color="inherit" sx={{ textTransform: "none" }}>
            Productos
          </Button>
          <Button component={Link} to="/usuarios" color="inherit" sx={{ textTransform: "none" }}>
            Usuarios
          </Button>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Productos />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/usuarios" element={<Usuarios />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}