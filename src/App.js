import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Productos from "./Productos";
import Usuarios from "./Usuarios";
import { AppBar, Toolbar, Button, Container } from "@mui/material";

function App() {
  return (
    <Router>
      <AppBar position="static" color="primary">
        <Toolbar style={{ display: "flex", gap: "20px" }}>
          <Button color="inherit" component={Link} to="/productos">
            Productos
          </Button>
          <Button color="inherit" component={Link} to="/usuarios">
            Usuarios
          </Button>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: "30px" }}>
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;