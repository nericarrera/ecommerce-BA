// src/components/SearchBar.jsx
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { apiService } from '../services/api';
import { toast } from 'react-toastify';

const SearchBar = ({ onSearchResults, placeholder = "Buscar mascotas..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearch = async (term) => {
    if (term.trim() === '') {
      onSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await apiService.buscarProductos(term);
      onSearchResults(results);
      
      if (results.length === 0 && term.trim() !== '') {
        toast.info('No se encontraron mascotas con ese criterio');
      }
    } catch (error) {
      toast.error('Error al buscar mascotas');
      console.error('Error en búsqueda:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Debounce para evitar muchas llamadas a la API
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (value.trim() === '') {
      onSearchResults([]);
      return;
    }

    const newTimeout = setTimeout(() => {
      handleSearch(value);
    }, 300); // 300ms de delay

    setSearchTimeout(newTimeout);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearchResults([]);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
  };

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return (
    <div className="position-relative" style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div className="input-group">
        <span className="input-group-text bg-transparent border-end-0">
          <FontAwesomeIcon 
            icon={faSearch} 
            className={isSearching ? 'text-primary' : 'text-muted'}
          />
        </span>
        
        <input
          type="text"
          className="form-control border-start-0"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          aria-label="Barra de búsqueda de mascotas"
          style={{
            paddingLeft: '0',
            background: 'rgba(15, 23, 42, 0.7)',
            color: '#e2e8f0',
            border: '1px solid rgba(120, 219, 226, 0.3)',
            backdropFilter: 'blur(10px)'
          }}
        />
        
        {searchTerm && (
          <button
            className="btn btn-outline-secondary border-start-0"
            type="button"
            onClick={handleClearSearch}
            aria-label="Limpiar búsqueda"
            style={{
              background: 'rgba(15, 23, 42, 0.7)',
              border: '1px solid rgba(120, 219, 226, 0.3)',
              color: '#ff77b8'
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
      </div>
      
      {isSearching && (
        <div className="position-absolute w-100 text-center mt-2">
          <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden">Buscando...</span>
          </div>
          <small className="ms-2" style={{ color: '#94a3b8' }}>Buscando...</small>
        </div>
      )}
    </div>
  );
};

export default SearchBar;