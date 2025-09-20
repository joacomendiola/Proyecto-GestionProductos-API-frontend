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
            {/* Mostrar imagen si existe */}
            {p.imagenUrl ? (
              <img
                src={p.imagenUrl}
                alt={p.nombre}
                className="imagen-producto"
              />
            ) : (
              <div className="imagen-placeholder"></div>
            )}
            <h2 className="nombre">{p.nombre}</h2>
            <p className="precio">${p.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;