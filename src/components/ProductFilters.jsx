import { useState } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductFilters = ({ products, onFilter, currentPage, totalPages, onPageChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('todos');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Filtrado en tiempo real
    const filtered = products.filter(product => 
      product.nombre.toLowerCase().includes(value.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(value.toLowerCase()) ||
      product.categoria.toLowerCase().includes(value.toLowerCase())
    );
    
    onFilter(filtered);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    
    const filtered = value === 'todos' 
      ? products 
      : products.filter(p => p.categoria === value);
    
    onFilter(filtered);
  };

  return (
    <div className="row mb-4">
      <div className="col-md-6 mb-3">
        <div className="input-group">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos por nombre, descripción o categoría..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      
      <div className="col-md-3 mb-3">
        <select 
          className="form-select"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="todos">Todas las categorías</option>
          <option value="gatos">Gatos</option>
          <option value="perros">Perros</option>
        </select>
      </div>
      
      <div className="col-md-3 mb-3">
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          
          <span className="mx-2">
            Página {currentPage} de {totalPages}
          </span>
          
          <button
            className="btn btn-outline-primary"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;