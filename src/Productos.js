import React, { useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Card, CardContent, CardActions, CardMedia,
  Typography, CircularProgress, Snackbar, Alert, Chip, Dialog, DialogTitle,
  DialogContent, DialogActions, InputAdornment, Fade
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

const API_URL = "https://proyecto-gestionproductos-api.onrender.com/productos";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });
  const [error, setError] = useState(null);

  // Formulario de ALTA
  const [form, setForm] = useState({ nombre: "", precio: "", imagenUrl: "" });

  // Modal de EDICIÓN
  const [editOpen, setEditOpen] = useState(false);
  const [edit, setEdit] = useState({ id: null, nombre: "", precio: "", imagenUrl: "" });

  // Dialog de BORRADO
  const [delOpen, setDelOpen] = useState(false);
  const [delId, setDelId] = useState(null);

  useEffect(() => { fetchProductos(); }, []);

  const fetchProductos = () => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => { setProductos(data); setLoading(false); })
      .catch(() => { setError("Error cargando productos"); setLoading(false); });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        setForm({ nombre: "", precio: "", imagenUrl: "" });
        fetchProductos();
        setSnackbar({ open: true, message: "Producto agregado ✅", type: "success" });
      })
      .catch(() => setSnackbar({ open: true, message: "Error guardando producto", type: "error" }));
  };

  const openEdit = (p) => { setEdit(p); setEditOpen(true); };
  const saveEdit = () => {
    fetch(`${API_URL}/${edit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: edit.nombre, precio: edit.precio, imagenUrl: edit.imagenUrl })
    })
      .then(res => res.json())
      .then(() => {
        setEditOpen(false);
        fetchProductos();
        setSnackbar({ open: true, message: "Producto actualizado ✅", type: "success" });
      })
      .catch(() => setSnackbar({ open: true, message: "Error actualizando", type: "error" }));
  };

  const confirmDelete = (id) => { setDelId(id); setDelOpen(true); };
  const doDelete = () => {
    fetch(`${API_URL}/${delId}`, { method: "DELETE" })
      .then(() => {
        setDelOpen(false);
        fetchProductos();
        setSnackbar({ open: true, message: "Producto eliminado 🗑️", type: "info" });
      })
      .catch(() => setSnackbar({ open: true, message: "Error eliminando", type: "error" }));
  };

  return (
    <Box>
      <Typography variant="h4" align="center" color="primary" fontWeight={600} gutterBottom>
        Gestión de Productos
      </Typography>

      {/* Formulario de ALTA */}
      <Box component="form" onSubmit={handleCreate}
           sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", mb: 3 }}>
        <TextField
          label="Nombre" required value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          InputProps={{ startAdornment: <InputAdornment position="start"><ShoppingCartOutlinedIcon/></InputAdornment> }}
        />
        <TextField
          type="number" label="Precio" required value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
          InputProps={{ startAdornment: <InputAdornment position="start"><AttachMoneyIcon/></InputAdornment> }}
        />
        <TextField
          label="URL de imagen" required value={form.imagenUrl}
          onChange={(e) => setForm({ ...form, imagenUrl: e.target.value })}
          InputProps={{ startAdornment: <InputAdornment position="start"><ImageOutlinedIcon/></InputAdornment> }}
          sx={{ minWidth: 320 }}
        />
        <Button type="submit" variant="contained" startIcon={<AddIcon />}>Agregar</Button>
      </Box>

      {/* Loader / Error */}
      {loading && (
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", my: 4, alignItems: "center" }}>
          <CircularProgress />
          <Typography>Cargando productos…</Typography>
        </Box>
      )}
      {error && <Typography color="error" align="center">{error}</Typography>}

      {/* Cards */}
      <Grid container spacing={3}>
        {productos.map((p) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
            <Fade in timeout={300}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 3,
                  transition: "transform .25s ease, box-shadow .25s ease",
                  "&:hover": { transform: "translateY(-8px)", boxShadow: 6 }
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={p.imagenUrl}
                  alt={p.nombre}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ pb: 1 }}>
                  <Typography variant="h6" gutterBottom>{p.nombre}</Typography>
                  <Chip label={`$${p.precio}`} color="primary" variant="outlined" />
                </CardContent>
                <CardActions sx={{ mt: "auto", justifyContent: "center", gap: 1, pb: 2 }}>
                  <Button size="small" variant="text" color="primary" startIcon={<EditIcon />} onClick={() => openEdit(p)}>
                    Editar
                  </Button>
                  <Button size="small" variant="text" color="error" startIcon={<DeleteIcon />} onClick={() => confirmDelete(p.id)}>
                    Eliminar
                  </Button>
                </CardActions>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Modal Edición */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Editar producto</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
            <TextField
              label="Nombre" value={edit.nombre}
              onChange={(e) => setEdit({ ...edit, nombre: e.target.value })} autoFocus
            />
            <TextField
              type="number" label="Precio" value={edit.precio}
              onChange={(e) => setEdit({ ...edit, precio: e.target.value })}
            />
            <TextField
              label="URL de imagen" value={edit.imagenUrl}
              onChange={(e) => setEdit({ ...edit, imagenUrl: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
          <Button onClick={saveEdit} variant="contained" startIcon={<SaveIcon />}>Guardar</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Borrado */}
      <Dialog open={delOpen} onClose={() => setDelOpen(false)}>
        <DialogTitle>¿Eliminar producto?</DialogTitle>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setDelOpen(false)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={doDelete} startIcon={<DeleteIcon />}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

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
    </Box>
  );
}