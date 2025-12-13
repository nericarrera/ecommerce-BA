# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# 🐾 PetFuture - E-commerce de Mascotas

![PetFuture Screenshot](https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200&h=630&fit=crop&crop=center)

## 📋 Tabla de Contenidos
- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API y Datos](#-api-y-datos)
- [Despliegue](#-despliegue)
- [Pruebas](#-pruebas)
- [Troubleshooting](#-troubleshooting)
- [Licencia](#-licencia)

## 🎯 Descripción

PetFuture es una aplicación web de e-commerce especializada en la adopción responsable de mascotas. Desarrollada como proyecto final del curso de React, implementa todas las funcionalidades requeridas para un e-commerce completo con enfoque en usabilidad y experiencia de usuario.

**Objetivo:** Facilitar el proceso de adopción de mascotas mediante una plataforma intuitiva, segura y responsive.

## ✨ Características

### ✅ **Requerimiento 1: Autenticación y Autorización**
- **Login/Logout** con persistencia en localStorage
- **Rutas protegidas** (`/pagar` requiere autenticación)
- **Context API** para gestión global del estado de usuario
- **Autenticación simulada** para fines demostrativos
- **Datos de usuario** persistidos durante la sesión

### ✅ **Requerimiento 2: CRUD Completo de Productos**
- **Create (Crear):** Formulario para agregar nuevas mascotas
- **Read (Leer):** Visualización de catálogo completo
- **Update (Actualizar):** Edición de información de mascotas
- **Delete (Eliminar):** Eliminación con modal de confirmación
- **Validaciones:** En tiempo real en formularios
- **Categorías:** Separación entre Gatos y Perros

### ✅ **Requerimiento 3: Carrito de Compras**
- **Agregar productos** al carrito desde cualquier página
- **Eliminar items** individualmente
- **Vaciar carrito** completamente
- **Cálculo automático** del total
- **Badge dinámico** en navbar con contador
- **Persistencia** durante la sesión

### ✅ **Requerimiento 4: Búsqueda y Paginación**
- **Búsqueda en tiempo real** por nombre, descripción o raza
- **Filtros por categoría** (Gatos, Perros, Todos)
- **Paginación completa** con navegación intuitiva
- **Items por página** configurable (8 por defecto)
- **Conteo de resultados** visible
- **Navegación rápida** entre páginas

### ✅ **Requerimiento 5: Preparación para Producción**
- **Diseño completamente responsive** (Mobile First)
- **Optimización de código** y performance
- **Documentación completa** (este README)
- **Compatibilidad cross-browser** verificada
- **Build optimizado** para producción

## 🛠️ Tecnologías

### **Frontend:**
- **React 19.2.0** - Biblioteca principal
- **React Router DOM 7.9.4** - Enrutamiento
- **Context API** - Gestión de estado global
- **React Hooks** - Functional components

### **Estilos:**
- **Bootstrap 5.3.2** - Framework CSS
- **Bootswatch (Cosmo)** - Tema personalizado
- **CSS3** - Estilos personalizados
- **FontAwesome 6** - Iconografía

### **Utilidades:**
- **React Toastify** - Notificaciones
- **Vite 7.1.10** - Bundler y dev server
- **ESLint** - Linting de código
- **Fetch API** - Peticiones HTTP (sin dependencias externas)

### **APIs:**
- **MockAPI** - API REST para datos de gatos
- **JSON local** - Datos de respaldo para perros

## 📦 Instalación

### **Prerrequisitos**
- Node.js 16.0 o superior
- npm 7.0 o superior
- Git (opcional)

### **Pasos de instalación**

1. **Clonar el repositorio**
```bash
git clone https://github.com/nericarrera/ecommerce-BA.git
cd petfuture



🙏 Agradecimientos
MockAPI.io por proporcionar API REST gratuita

Unsplash por las imágenes de mascotas

Bootswatch por los temas de Bootstrap

React community por la documentación y recursos

Instructores y compañeros del curso por el apoyo
