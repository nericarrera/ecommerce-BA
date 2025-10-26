import './App.css'
import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import Gatos from './pages/Gatos'
import DetalleGatos from './pages/DetalleGatos'
import DetallePerros from './pages/DetallePerros'
import Carrito from './pages/Carrito'
import Pagar from './pages/Pagar'
import RutaProtegida from './pages/RutaProtegida'
import IniciarSesion from './pages/IniciarSesion'
import Perros from './pages/Perros'
import { AppProvided } from './context/AppContext'

function App() {
    
  return (
    <AppProvided>

    <>
      <Routes>
        <Route element={<Layout />} >
          <Route path='/' element={<Inicio />} />
          <Route path='/servicios' element={<Servicios />} />
          <Route path='/gatos' element={<Gatos />} />
          <Route path='/perros' element={<Perros />} />
          <Route path='/gatos/:id/:nombre' element={<DetalleGatos />} />
          <Route path='/perros/:id/:nombre' element={<DetallePerros />} />
          <Route path='/carrito' element={<Carrito />} />
        </Route>

        <Route path="/iniciar-sesion" element={<IniciarSesion />} />

        <Route path="/pagar" element={<RutaProtegida> <Pagar /> </RutaProtegida>} />
      </Routes>
    </>

    </AppProvided>
  )
}

export default App
