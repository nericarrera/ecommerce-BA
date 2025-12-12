// src/components/Pagination.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronLeft, 
  faChevronRight,
  faChevronDoubleLeft,
  faChevronDoubleRight
} from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  itemsPerPage = 9,
  totalItems 
}) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`btn ${currentPage === i ? 'active' : ''}`}
          aria-label={`Ir a página ${i}`}
          aria-current={currentPage === i ? 'page' : undefined}
          style={{
            minWidth: '40px',
            margin: '0 2px',
            background: currentPage === i 
              ? 'linear-gradient(135deg, #667eea, #78dbe2)' 
              : 'rgba(30, 41, 59, 0.8)',
            color: currentPage === i ? '#0f172a' : '#94a3b8',
            border: currentPage === i 
              ? 'none' 
              : '1px solid rgba(148, 163, 184, 0.3)',
            fontWeight: currentPage === i ? 'bold' : 'normal'
          }}
        >
          {i}
        </button>
      );
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      {/* Información de página */}
      <div className="mb-3 text-center">
        <small style={{ color: '#94a3b8' }}>
          Mostrando {startItem}-{endItem} de {totalItems} mascotas
        </small>
      </div>
      
      {/* Controles de paginación */}
      <div className="d-flex align-items-center gap-2">
        {/* Primer página */}
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="btn"
          aria-label="Ir a la primera página"
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            color: currentPage === 1 ? '#475569' : '#78dbe2',
            border: '1px solid rgba(120, 219, 226, 0.3)',
            opacity: currentPage === 1 ? 0.5 : 1,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          <FontAwesomeIcon icon={faChevronDoubleLeft} />
        </button>
        
        {/* Página anterior */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn"
          aria-label="Ir a la página anterior"
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            color: currentPage === 1 ? '#475569' : '#78dbe2',
            border: '1px solid rgba(120, 219, 226, 0.3)',
            opacity: currentPage === 1 ? 0.5 : 1,
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        
        {/* Números de página */}
        {renderPageNumbers()}
        
        {/* Página siguiente */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn"
          aria-label="Ir a la página siguiente"
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            color: currentPage === totalPages ? '#475569' : '#78dbe2',
            border: '1px solid rgba(120, 219, 226, 0.3)',
            opacity: currentPage === totalPages ? 0.5 : 1,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        
        {/* Última página */}
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="btn"
          aria-label="Ir a la última página"
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            color: currentPage === totalPages ? '#475569' : '#78dbe2',
            border: '1px solid rgba(120, 219, 226, 0.3)',
            opacity: currentPage === totalPages ? 0.5 : 1,
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
          }}
        >
          <FontAwesomeIcon icon={faChevronDoubleRight} />
        </button>
      </div>
      
      {/* Selector de items por página */}
      <div className="mt-3">
        <small style={{ color: '#94a3b8' }} className="me-2">Mostrar:</small>
        <select 
          className="form-select form-select-sm d-inline-block w-auto"
          style={{
            background: 'rgba(30, 41, 59, 0.8)',
            color: '#e2e8f0',
            border: '1px solid rgba(120, 219, 226, 0.3)'
          }}
          onChange={(e) => onPageChange(1, parseInt(e.target.value))}
        >
          <option value="6">6</option>
          <option value="9" selected>9</option>
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
        <small style={{ color: '#94a3b8' }} className="ms-2">por página</small>
      </div>
    </div>
  );
};

export default Pagination;