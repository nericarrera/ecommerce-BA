// App.jsx
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Servicios from './pages/Servicios'
import DetalleGatos from './pages/DetalleGatos'
import DetallePerros from './pages/DetallePerros'
import Carrito from './pages/Carrito'
import Pagar from './pages/Pagar'
import RutaProtegida from './pages/RutaProtegida'
import IniciarSesion from './pages/IniciarSesion'
import { AppProvider } from '../context'

// Importa los componentes nuevos que creamos
import ProductList from './components/ProductList'

function App() {
  return (
    <AppProvider>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route element={<Layout />} >
          <Route path='/' element={<Home />} />
          <Route path='/mascotas' element={<ProductList />} /> {/* TODAS las mascotas */}
          <Route path='/servicios' element={<Servicios />} />
          <Route path='/gatos' element={<ProductList category="gatos" />} /> {/* Solo gatos */}
          <Route path='/perros' element={<ProductList category="perros" />} /> {/* Solo perros */}
          <Route path='/gatos/:id' element={<DetalleGatos />} /> {/* Quité /:nombre del path */}
          <Route path='/perros/:id' element={<DetallePerros />} /> {/* Quité /:nombre del path */}
          <Route path='/carrito' element={<Carrito />} />
        </Route>

        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/pagar" element={<RutaProtegida> <Pagar /> </RutaProtegida>} />
      </Routes>
    </AppProvider>
  )
}

export default App