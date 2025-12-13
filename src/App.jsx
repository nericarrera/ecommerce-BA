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
          <Route path='/mascotas' element={<Mascotas />} />
          <Route path='/servicios' element={<Servicios />} />
          <Route path='/gatos' element={<Gatos />} />
          <Route path='/perros' element={<Perros />} />
          <Route path='/gatos/:id/:nombre?' element={<DetalleGatos />} /> {/* Agregado :nombre opcional */}
          <Route path='/perros/:id/:nombre?' element={<DetallePerros />} /> {/* Agregado :nombre opcional */}
          <Route path='/carrito' element={<Carrito />} />
          <Route path='/iniciar-sesion' element={<IniciarSesion />} /> {/* ¡AGREGADO dentro de Layout! */}
        </Route>

        {/* Rutas separadas (sin Layout si es necesario) */}
        <Route path="/pagar" element={
          <RutaProtegida>
            <Layout> {/* Opcional: si quieres que Pagar tenga Layout */}
              <Pagar />
            </Layout>
          </RutaProtegida>
        } />
      </Routes>
    </>
  )
}

export default App;