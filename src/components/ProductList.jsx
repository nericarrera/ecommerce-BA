// src/components/ProductList.jsx
import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { toast } from 'react-toastify';

const ProductList = ({ 
  category = null,
  itemsPerPage = 9,
  showSearch = true,
  showPagination = true
}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(itemsPerPage);

  // Cargar productos
  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      let data;
      if (category) {
        data = await apiService.getProductosPorCategoria(category);
      } else {
        data = await apiService.getProductos();
      }
      setProducts(data);
      setFilteredProducts(data);
      toast.success(`Cargadas ${data.length} mascotas`);
    } catch (error) {
      toast.error('Error al cargar las mascotas');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Manejar resultados de búsqueda
  const handleSearchResults = (results) => {
    setFilteredProducts(results);
    setCurrentPage(1); // Volver a página 1 al buscar
  };

  // Calcular productos para la página actual
  const indexOfLastItem = currentPage * currentItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - currentItemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / currentItemsPerPage);

  // Cambiar página
  const handlePageChange = (page, newItemsPerPage = currentItemsPerPage) => {
    setCurrentPage(page);
    if (newItemsPerPage !== currentItemsPerPage) {
      setCurrentItemsPerPage(newItemsPerPage);
      setCurrentPage(1); // Reset a página 1 al cambiar items por página
    }
  };

  // Renderizar producto individual
  const renderProduct = (product) => (
    <div 
      key={product.id} 
      className="col-lg-4 col-md-6 mb-4"
    >
      <div 
        className="card h-100 border-0 rounded-4 overflow-hidden"
        style={{
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(120, 219, 226, 0.2)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 10px 25px rgba(120, 219, 226, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div className="position-relative">
          <img 
            src={product.imagen} 
            alt={product.nombre}
            className="card-img-top"
            style={{ 
              height: '200px', 
              objectFit: 'cover' 
            }}
          />
          <div 
            className="position-absolute top-0 start-0 m-3 px-3 py-1 rounded-pill"
            style={{
              background: product.categoria === 'perros' 
                ? 'rgba(102, 126, 234, 0.9)' 
                : 'rgba(120, 219, 226, 0.9)',
              color: '#0f172a',
              fontSize: '0.8rem',
              fontWeight: 'bold'
            }}
          >
            {product.categoria === 'perros' ? '🐶 Perro' : '🐱 Gato'}
          </div>
        </div>
        
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold" style={{ color: '#e2e8f0' }}>
            {product.nombre}
          </h5>
          <p className="card-text flex-grow-1" style={{ color: '#cbd5e1' }}>
            {product.descripcion.length > 100 
              ? `${product.descripcion.substring(0, 100)}...` 
              : product.descripcion}
          </p>
          
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <div className="small" style={{ color: '#94a3b8' }}>Edad:</div>
              <div style={{ color: '#e2e8f0' }}>{product.edad || 'No especificada'}</div>
            </div>
            <div className="text-end">
              <div className="small" style={{ color: '#94a3b8' }}>Precio:</div>
              <h4 className="mb-0 fw-bold" style={{ 
                background: 'linear-gradient(135deg, #667eea, #ff77b8)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                ${product.precio}
              </h4>
            </div>
          </div>
          
          <button
            className="btn mt-3 w-100 fw-bold py-2 rounded-pill"
            style={{
              background: 'linear-gradient(135deg, #667eea, #78dbe2)',
              color: '#0f172a',
              border: 'none'
            }}
            onClick={() => {
              // Navegar a detalles
              const path = product.categoria === 'perros' ? '/perros' : '/gatos';
              window.location.href = `${path}/${product.id}`;
            }}
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3" style={{ color: '#94a3b8' }}>Cargando mascotas...</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      {/* Header con búsqueda */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <h2 className="fw-bold mb-0" style={{ color: '#e2e8f0' }}>
              {category === 'perros' ? '🐶 Perros Disponibles' : 
               category === 'gatos' ? '🐱 Gatos Disponibles' : 
               '🐾 Todas las Mascotas'}
              <small className="d-block mt-1 fw-normal fs-6" style={{ color: '#94a3b8' }}>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'mascota encontrada' : 'mascotas encontradas'}
              </small>
            </h2>
            
            {showSearch && (
              <SearchBar 
                onSearchResults={handleSearchResults}
                placeholder={`Buscar ${category || 'mascotas'}...`}
              />
            )}
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-5">
          <div 
            className="display-1 mb-3"
            style={{ 
              background: 'linear-gradient(135deg, #78dbe2, #ff77b8)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            🐾
          </div>
          <h4 className="fw-bold mb-3" style={{ color: '#e2e8f0' }}>
            No se encontraron mascotas
          </h4>
          <p className="mb-4" style={{ color: '#cbd5e1' }}>
            {products.length > 0 
              ? 'Prueba con otros términos de búsqueda'
              : 'No hay mascotas disponibles en este momento'}
          </p>
          <button
            className="btn fw-bold px-4 py-2 rounded-pill"
            onClick={loadProducts}
            style={{
              background: 'rgba(30, 41, 59, 0.8)',
              color: '#78dbe2',
              border: '1px solid rgba(120, 219, 226, 0.3)'
            }}
          >
            Recargar
          </button>
        </div>
      ) : (
        <>
          <div className="row">
            {currentItems.map(renderProduct)}
          </div>

          {/* Paginación */}
          {showPagination && filteredProducts.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={currentItemsPerPage}
              totalItems={filteredProducts.length}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;