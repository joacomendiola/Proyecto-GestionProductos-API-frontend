import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Productos from "./Productos";
import Usuarios from "./Usuarios";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        {/* Menú de navegación */}
        <nav className="menu">
          <Link to="/productos">Productos</Link>
          <Link to="/usuarios">Usuarios</Link>
        </nav>

        {/* Rutas */}
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;