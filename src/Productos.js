import React, { useEffect, useState } from "react";
import "./App.css";

function Productos() {
  const API_URL = "https://proyecto-gestionproductos-api.onrender.com/productos";

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    id: null,
    nombre: "",
    precio: "",
    imagenUrl: ""
  });

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error cargando productos");
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const metodo = form.id ? "PUT" : "POST";
    const url = form.id ? `${API_URL}/${form.id}` : API_URL;

    fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: form.nombre,
        precio: form.precio,
        imagenUrl: form.imagenUrl
      })
    })
      .then((res) => res.json())
      .then(() => {
        fetchProductos();
        setForm({ id: null, nombre: "", precio: "", imagenUrl: "" });
      })
      .catch(() => setError("Error guardando producto"));
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => fetchProductos())
        .catch(() => setError("Error eliminando producto"));
    }
  };

  const handleEdit = (producto) => {
    setForm(producto);
  };

  return (
    <div className="container">
      <h1 className="titulo">Gestión de Productos</h1>

      <form onSubmit={handleSubmit} className="formulario">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          step="0.01"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imagenUrl"
          placeholder="URL de la imagen"
          value={form.imagenUrl}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {form.id ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </form>

      {loading && <p>Cargando productos...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {productos.map((p, i) => (
          <div key={p.id} className="card">
            {p.imagenUrl ? (
              <img src={p.imagenUrl} alt={p.nombre} className="imagen-producto" />
            ) : (
              <div className="imagen-placeholder"></div>
            )}
            <h2 className="nombre">{p.nombre}</h2>
            <p className="precio">${p.precio}</p>
            <div className="acciones">
              <button className="editar" onClick={() => handleEdit(p)}>
                Editar
              </button>
              <button className="eliminar" onClick={() => handleDelete(p.id)}>
                Eliminar
              </button>
            </div>
            <span className="numero">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;