import React, { useEffect, useState } from "react";
import {
  Box, Grid, TextField, Button, Card, CardContent, CardActions,
  Typography, CircularProgress, Snackbar, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions, InputAdornment, Fade
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

const API_URL = "https://proyecto-gestionproductos-api.onrender.com/usuarios";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });
  const [error, setError] = useState(null);

  // Form ALTA
  const [form, setForm] = useState({ nombre: "", correo: "" });

  // Modal EDICIÓN
  const [editOpen, setEditOpen] = useState(false);
  const [edit, setEdit] = useState({ id: null, nombre: "", correo: "" });

  // Dialog BORRADO
  const [delOpen, setDelOpen] = useState(false);
  const [delId, setDelId] = useState(null);

  useEffect(() => { fetchUsuarios(); }, []);

  const fetchUsuarios = () => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => { setUsuarios(data); setLoading(false); })
      .catch(() => { setError("Error cargando usuarios"); setLoading(false); });
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
        setForm({ nombre: "", correo: "" });
        fetchUsuarios();
        setSnackbar({ open: true, message: "Usuario agregado ✅", type: "success" });
      })
      .catch(() => setSnackbar({ open: true, message: "Error guardando usuario", type: "error" }));
  };

  const openEdit = (u) => { setEdit(u); setEditOpen(true); };
  const saveEdit = () => {
    fetch(`${API_URL}/${edit.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: edit.nombre, correo: edit.correo })
    })
      .then(res => res.json())
      .then(() => {
        setEditOpen(false);
        fetchUsuarios();
        setSnackbar({ open: true, message: "Usuario actualizado ✅", type: "success" });
      })
      .catch(() => setSnackbar({ open: true, message: "Error actualizando", type: "error" }));
  };

  const confirmDelete = (id) => { setDelId(id); setDelOpen(true); };
  const doDelete = () => {
    fetch(`${API_URL}/${delId}`, { method: "DELETE" })
      .then(() => {
        setDelOpen(false);
        fetchUsuarios();
        setSnackbar({ open: true, message: "Usuario eliminado 🗑️", type: "info" });
      })
      .catch(() => setSnackbar({ open: true, message: "Error eliminando", type: "error" }));
  };

  return (
    <Box>
      <Typography variant="h4" align="center" color="primary" fontWeight={600} gutterBottom>
        Gestión de Usuarios
      </Typography>

      {/* Form ALTA */}
      <Box component="form" onSubmit={handleCreate}
           sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center", mb: 3 }}>
        <TextField
          label="Nombre" required value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon/></InputAdornment> }}
        />
        <TextField
          type="email" label="Correo" required value={form.correo}
          onChange={(e) => setForm({ ...form, correo: e.target.value })}
          InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon/></InputAdornment> }}
          sx={{ minWidth: 320 }}
        />
        <Button type="submit" variant="contained" startIcon={<AddIcon />}>Agregar</Button>
      </Box>

      {/* Loader / Error */}
      {loading && (
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", my: 4, alignItems: "center" }}>
          <CircularProgress />
          <Typography>Cargando usuarios…</Typography>
        </Box>
      )}
      {error && <Typography color="error" align="center">{error}</Typography>}

      {/* Cards */}
      <Grid container spacing={3}>
        {usuarios.map((u) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={u.id}>
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
                <CardContent sx={{ pb: 1 }}>
                  <Typography variant="h6" gutterBottom>{u.nombre}</Typography>
                  <Typography variant="body1" color="secondary">{u.correo}</Typography>
                </CardContent>
                <CardActions sx={{ mt: "auto", justifyContent: "center", gap: 1, pb: 2 }}>
                  <Button size="small" variant="text" color="primary" startIcon={<EditIcon />} onClick={() => openEdit(u)}>
                    Editar
                  </Button>
                  <Button size="small" variant="text" color="error" startIcon={<DeleteIcon />} onClick={() => confirmDelete(u.id)}>
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
        <DialogTitle>Editar usuario</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: "grid", gap: 2, mt: 1 }}>
            <TextField
              label="Nombre" value={edit.nombre}
              onChange={(e) => setEdit({ ...edit, nombre: e.target.value })} autoFocus
            />
            <TextField
              type="email" label="Correo" value={edit.correo}
              onChange={(e) => setEdit({ ...edit, correo: e.target.value })}
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
        <DialogTitle>¿Eliminar usuario?</DialogTitle>
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