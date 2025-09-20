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

function Usuarios() {
  const API_URL = "https://proyecto-gestionproductos-api.onrender.com/usuarios";

  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });

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
        setSnackbar({
          open: true,
          message: form.id ? "Usuario actualizado ✅" : "Usuario agregado ✅",
          type: "success"
        });
      })
      .catch(() =>
        setSnackbar({ open: true, message: "Error guardando usuario", type: "error" })
      );
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => {
          fetchUsuarios();
          setSnackbar({ open: true, message: "Usuario eliminado 🗑️", type: "info" });
        })
        .catch(() =>
          setSnackbar({ open: true, message: "Error eliminando usuario", type: "error" })
        );
    }
  };

  const handleEdit = (usuario) => {
    setForm(usuario);
  };

  return (
    <div>
      <Typography variant="h4" align="center" color="primary" gutterBottom>
        Gestión de Usuarios
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
          type="email"
          label="Correo"
          name="correo"
          value={form.correo}
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

      {/* Lista de usuarios */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px"
        }}
      >
        {usuarios.map((u) => (
          <Card
            key={u.id}
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
            <CardContent>
              <Typography variant="h6">{u.nombre}</Typography>
              <Typography variant="body1" color="secondary">
                {u.correo}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => handleEdit(u)}
              >
                Editar
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(u.id)}
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

export default Usuarios;