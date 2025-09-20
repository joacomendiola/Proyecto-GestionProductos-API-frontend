import React, { useEffect, useState } from "react";
import "./App.css";

function Usuarios() {
  const API_URL = "https://proyecto-gestionproductos-api.onrender.com/usuarios";

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    id: null,
    nombre: "",
    correo: ""
  });

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = () => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error cargando usuarios");
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
        correo: form.correo
      })
    })
      .then((res) => res.json())
      .then(() => {
        fetchUsuarios();
        setForm({ id: null, nombre: "", correo: "" });
      })
      .catch(() => setError("Error guardando usuario"));
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => fetchUsuarios())
        .catch(() => setError("Error eliminando usuario"));
    }
  };

  const handleEdit = (usuario) => {
    setForm(usuario);
  };

  return (
    <div className="container">
      <h1 className="titulo">Gestión de Usuarios</h1>

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
          type="email"
          name="correo"
          placeholder="Correo"
          value={form.correo}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {form.id ? "Actualizar Usuario" : "Agregar Usuario"}
        </button>
      </form>

      {loading && <p>Cargando usuarios...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {usuarios.map((u, i) => (
          <div key={u.id} className="card">
            <h2 className="nombre">{u.nombre}</h2>
            <p className="precio">{u.correo}</p>
            <div className="acciones">
              <button className="editar" onClick={() => handleEdit(u)}>
                Editar
              </button>
              <button className="eliminar" onClick={() => handleDelete(u.id)}>
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

export default Usuarios;