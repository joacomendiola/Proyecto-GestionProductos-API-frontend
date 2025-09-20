import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Productos() {
  const API_URL = "https://proyecto-gestionproductos-api.onrender.com/productos";

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });

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
        setSnackbar({
          open: true,
          message: form.id ? "Producto actualizado ✅" : "Producto agregado ✅",
          type: "success"
        });
      })
      .catch(() =>
        setSnackbar({ open: true, message: "Error guardando producto", type: "error" })
      );
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => {
          fetchProductos();
          setSnackbar({ open: true, message: "Producto eliminado 🗑️", type: "info" });
        })
        .catch(() =>
          setSnackbar({ open: true, message: "Error eliminando producto", type: "error" })
        );
    }
  };

  const handleEdit = (producto) => {
    setForm(producto);
  };

  return (
    <div>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Gestión de Productos
      </Typography>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "20px"
        }}
      >
        <TextField
          label="Nombre"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <TextField
          type="number"
          label="Precio"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <TextField
          label="URL de imagen"
          name="imagenUrl"
          value={form.imagenUrl}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          {form.id ? "Actualizar" : "Agregar"}
        </Button>
      </form>

      {/* Loader */}
      {loading && (
        <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
          <CircularProgress />
        </div>
      )}
      {error && <Typography color="error">{error}</Typography>}

      {/* Lista */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px"
        }}
      >
        {productos.map((p) => (
  <Card
    key={p.id}
    sx={{
      borderRadius: "16px",
      boxShadow: 3,
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
      "&:hover": {
        transform: "translateY(-8px)",
        boxShadow: 6
      }
    }}
  >
    <img
      src={p.imagenUrl}
      alt={p.nombre}
      style={{ width: "100%", height: "160px", objectFit: "cover" }}
    />
    <CardContent>
      <Typography variant="h6">{p.nombre}</Typography>
      <Typography variant="body1" color="secondary">
        ${p.precio}
      </Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: "center", gap: 1, paddingBottom: 1 }}>
  <Button
    variant="text"
    color="primary"
    startIcon={<EditIcon />}
    onClick={() => handleEdit(p)}
  >
    Editar
  </Button>
  <Button
    variant="text"
    color="error"
    startIcon={<DeleteIcon />}
    onClick={() => handleDelete(p.id)}
  >
    Eliminar
  </Button>
</CardActions>
  </Card>
))}
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.type} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Productos;