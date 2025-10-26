import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

function IniciarSesion() {
  const navigate = useNavigate()
  const ubicacion = useLocation()

  const { setIsAuthenticated, setUsuario } = useAppContext()

  const [formulario, setFormulario] = useState({ nombre: '', email: '' })

  const manejarEnvio = (e) => {
    e.preventDefault()
    if (formulario.nombre && formulario.email) {
      setIsAuthenticated(true)
      setUsuario(formulario)

      if (ubicacion.state?.cart) {
        navigate('/pagar', { state: { cart: ubicacion.state.cart } })
      } else {
        navigate('/')
      }
    } else {
      alert('Error: Completa todos los datos')
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-start">
      <form 
        onSubmit={manejarEnvio} 
        className="bg-white p-4 rounded shadow"
        style={{ minWidth: '300px', maxWidth: '400px', width: '90%' }}
      >
        <h3 className="fw-bold text-primary mb-4 text-center border-bottom pb-2">Iniciar Sesión</h3>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Nombre completo"
            value={formulario.nombre}
            onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            value={formulario.email}
            onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-success w-100 mb-2">
          Iniciar Sesión
        </button>
        <button type="button" onClick={() => navigate('/')} className="btn btn-secondary w-100">
          Cancelar
        </button>
      </form>
    </div>
  )
}

export default IniciarSesion
