import React, { useEffect, useState } from "react";

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("https://proyecto-gestionproductos-api.onrender.com/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lista de Productos</h1>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>{p.nombre} - ${p.precio}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;