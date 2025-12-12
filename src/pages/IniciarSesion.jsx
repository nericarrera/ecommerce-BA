import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './context';
import { toast } from 'react-toastify';
import { FaSignInAlt, FaUser, FaLock } from 'react-icons/fa';

const IniciarSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setIsAuthenticated, setUsuario } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Login simulado (Requerimiento #1)
    if (email && password) {
      const userData = {
        nombre: 'Usuario Demo',
        email: email,
        token: 'mock-token-' + Date.now()
      };
      
      // Guardar en localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Actualizar contexto
      setIsAuthenticated(true);
      setUsuario(userData);
      
      toast.success('¡Sesión iniciada correctamente!');
      navigate('/');
    } else {
      toast.error('Por favor completa todos los campos');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0"><FaSignInAlt className="me-2" /> Iniciar Sesión</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    <FaUser className="me-2" /> Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <FaLock className="me-2" /> Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Ingresar
                </button>
                <p className="mt-3 text-muted small">
                  Usuario demo: cualquier email/contraseña funciona
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IniciarSesion;