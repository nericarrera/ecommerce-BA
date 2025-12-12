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

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />} >
          <Route path='/' element={<Inicio />} />
          <Route path='/servicios' element={<Servicios />} />
          <Route path='/gatos' element={<Inicio />} />
          <Route path='/perros' element={<Inicio />} />
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