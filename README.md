<div align="center">

# 🎨 Frontend - Gestión de Productos

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![React](https://img.shields.io/badge/React-19-blue)
![Material UI](https://img.shields.io/badge/Material_UI-7.x-007FFF)
![React Router](https://img.shields.io/badge/React_Router-7.x-orange)
![CSS3](https://img.shields.io/badge/CSS3-Styles-blueviolet)
![Render](https://img.shields.io/badge/Deploy-Render-purple)
![Estado](https://img.shields.io/badge/Estado-Terminado-brightgreen)

**Aplicación frontend en React para la gestión de productos y usuarios, consumiendo una API REST desarrollada en Spring Boot.**

</div>

---

## 📖 Descripción
Aplicación frontend desarrollada en **JavaScript (ES6+)**, utilizando **React 19**, **Material UI** y **CSS3** para la interfaz.  
Consume la API REST del proyecto backend y permite operaciones CRUD (Create, Read, Update, Delete) para **productos** y **usuarios**.  

Este es un **proyecto personal de práctica**, diseñado para integrarse con el backend desplegado en **Render**.  

🔗 Backend: [Proyecto-GestionProductos-API-backend](https://github.com/joacomendiola/Proyecto-GestionProductos-API-backend)

---

## ✨ Características

- **CRUD completo** → Crear, leer, actualizar y eliminar productos y usuarios  
- **Material UI** → Componentes visuales modernos y responsive  
- **React Router** → Navegación entre módulos de Productos y Usuarios  
- **Fetch API** → Comunicación directa con el backend  
- **Validaciones** → Control de formularios y errores  
- **Feedback visual** → Loaders, snackbars y alertas de éxito/error  

---

## 🏗️ Stack Tecnológico

- 🟨 **JavaScript (ES6+)** → Lenguaje principal  
- ⚛️ **React 19** → Biblioteca principal de UI  
- 🎨 **Material UI 7.x** → Componentes visuales y estilos  
- 🛣️ **React Router DOM 7.x** → Enrutamiento entre vistas  
- 🎨 **CSS3** → Estilos (`App.css`, `index.css`)  
- 🔤 **@fontsource/poppins** → Tipografía personalizada  
- 🧪 **Testing Library** → Incluida por defecto con Create React App
- 🚀 **Render** → Plataforma de despliegue  

---

## 📂 Arquitectura del Proyecto

```text
src/
├── App.js                # Componente principal con enrutamiento
├── Productos.js          # CRUD de productos (nombre, precio, imagenUrl)
├── Usuarios.js           # CRUD de usuarios (nombre, correo)
├── App.css               # Estilos principales
├── index.js              # Punto de entrada de la aplicación
├── index.css             # Estilos globales
└── ... (otros archivos CRA: logo.svg, tests, reportWebVitals.js, etc.)
```

---

## 🔗 Comunicación con Backend

La aplicación se conecta a la API desplegada en Render:  

- Productos → `https://proyecto-gestionproductos-api.onrender.com/productos`  
- Usuarios → `https://proyecto-gestionproductos-api.onrender.com/usuarios`
  
---

## 💻 Uso de la Aplicación

1. Desde el menú superior se puede navegar entre **Productos** y **Usuarios**.  
2. Cada módulo permite **agregar, editar y eliminar** registros.  
3. Los formularios validan campos obligatorios antes de enviar.  
4. Las operaciones muestran **notificaciones visuales** (snackbars).  
5. La interfaz es responsive y se adapta a distintos dispositivos.  

---

## 📊 Componentes Principales

### App.js
- Barra de navegación con Material UI  
- Rutas principales: `/productos` y `/usuarios`  

### Productos.js
- Formulario para alta de productos  
- Listado en cards con imagen, nombre y precio  
- Funcionalidad de editar y eliminar  

### Usuarios.js
- Formulario para alta de usuarios  
- Listado en cards con nombre y correo  
- Funcionalidad de editar y eliminar
  
---

## 👨‍💻 Autor
Desarrollado por **Joaquín Mendiola**  
🌐 GitHub: [joacomendiola](https://github.com/joacomendiola)
