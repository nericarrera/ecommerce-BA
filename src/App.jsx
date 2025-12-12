// src/App.jsx
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import DetalleGatos from './pages/DetalleGatos'
import DetallePerros from './pages/DetallePerros'
import Carrito from './pages/Carrito'
import Pagar from './pages/Pagar'
import RutaProtegida from './pages/RutaProtegida'
import IniciarSesion from './pages/IniciarSesion'

// Importa las páginas existentes
import Mascotas from './pages/Mascotas'
import Gatos from './pages/Gatos'
import Perros from './pages/Perros'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />} >
          <Route path='/' element={<Inicio />} />
          <Route path='/mascotas' element={<Mascotas />} /> {/* ← Página Mascotas */}
          <Route path='/servicios' element={<Servicios />} />
          <Route path='/gatos' element={<Gatos />} /> {/* ← Página Gatos */}
          <Route path='/perros' element={<Perros />} /> {/* ← Página Perros */}
          <Route path='/gatos/:id' element={<DetalleGatos />} />
          <Route path='/perros/:id' element={<DetallePerros />} />
          <Route path='/carrito' element={<Carrito />} />
        </Route>

        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/pagar" element={<RutaProtegida> <Pagar /> </RutaProtegida>} />
      </Routes>
    </>
  )
}

export default App