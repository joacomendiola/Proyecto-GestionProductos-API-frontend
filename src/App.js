import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("https://proyecto-gestionproductos-api.onrender.com/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  return (
    <div className="container">
      <h1 className="titulo">Lista de Productos</h1>
      <div className="grid">
        {productos.map((p) => (
          <div key={p.id} className="card">
            <div className="imagen-placeholder"></div>
            <h2 className="nombre">{p.nombre}</h2>
            <p className="precio">${p.precio}</p>
            <button className="btn">Agregar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;