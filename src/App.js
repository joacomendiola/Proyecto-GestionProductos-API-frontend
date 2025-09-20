import { useEffect, useState } from "react";
import "./App.css"; // vamos a usar este CSS

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://proyecto-gestionproductos-api.onrender.com/productos")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="title">🛒 Lista de Productos</h1>

      {loading ? (
        <p className="loading">Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p className="empty">No hay productos disponibles.</p>
      ) : (
        <div className="card-grid">
          {productos.map((prod) => (
            <div className="card" key={prod.id}>
              <h2>{prod.nombre}</h2>
              <p className="price">${prod.precio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;