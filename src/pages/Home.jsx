// src/pages/Home.jsx
import { useState } from 'react';
import ProductList from '../components/ProductList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faCat, faPaw } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div 
      className="min-vh-100 py-5"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      }}
    >
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold display-4 mb-3" style={{ 
            background: 'linear-gradient(135deg, #78dbe2, #ff77b8)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            <FontAwesomeIcon icon={faPaw} className="me-3" />
            Adopta una Mascota
          </h1>
          <p className="lead mb-4" style={{ color: '#cbd5e1', maxWidth: '600px', margin: '0 auto' }}>
            Encuentra a tu compañero ideal para toda la vida. Perros y gatos saludables, 
            vacunados y listos para llenar tu hogar de amor.
          </p>
        </div>

        {/* Filtros de categoría */}
        <div className="row justify-content-center mb-5">
          <div className="col-auto">
            <div className="d-flex flex-wrap gap-3 justify-content-center">
              <button
                onClick={() => setActiveCategory(null)}
                className={`btn fw-bold px-4 py-3 rounded-pill d-flex align-items-center ${
                  activeCategory === null ? 'active' : ''
                }`}
                style={{
                  background: activeCategory === null 
                    ? 'linear-gradient(135deg, #667eea, #78dbe2)' 
                    : 'rgba(30, 41, 59, 0.8)',
                  color: activeCategory === null ? '#0f172a' : '#94a3b8',
                  border: activeCategory === null 
                    ? 'none' 
                    : '1px solid rgba(148, 163, 184, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                <FontAwesomeIcon icon={faPaw} className="me-2" />
                Todas las Mascotas
              </button>
              
              <button
                onClick={() => setActiveCategory('perros')}
                className={`btn fw-bold px-4 py-3 rounded-pill d-flex align-items-center ${
                  activeCategory === 'perros' ? 'active' : ''
                }`}
                style={{
                  background: activeCategory === 'perros' 
                    ? 'linear-gradient(135deg, #667eea, #78dbe2)' 
                    : 'rgba(30, 41, 59, 0.8)',
                  color: activeCategory === 'perros' ? '#0f172a' : '#94a3b8',
                  border: activeCategory === 'perros' 
                    ? 'none' 
                    : '1px solid rgba(148, 163, 184, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                <FontAwesomeIcon icon={faDog} className="me-2" />
                Solo Perros
              </button>
              
              <button
                onClick={() => setActiveCategory('gatos')}
                className={`btn fw-bold px-4 py-3 rounded-pill d-flex align-items-center ${
                  activeCategory === 'gatos' ? 'active' : ''
                }`}
                style={{
                  background: activeCategory === 'gatos' 
                    ? 'linear-gradient(135deg, #78dbe2, #ff77b8)' 
                    : 'rgba(30, 41, 59, 0.8)',
                  color: activeCategory === 'gatos' ? '#0f172a' : '#94a3b8',
                  border: activeCategory === 'gatos' 
                    ? 'none' 
                    : '1px solid rgba(148, 163, 184, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                <FontAwesomeIcon icon={faCat} className="me-2" />
                Solo Gatos
              </button>
            </div>
          </div>
        </div>

        {/* Lista de productos con búsqueda y paginación */}
        <ProductList 
          category={activeCategory}
          showSearch={true}
          showPagination={true}
        />
      </div>
    </div>
  );
};

export default Home;