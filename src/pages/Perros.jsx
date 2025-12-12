import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from '../hooks/useAppContext';
import { toast } from "react-toastify";
import { 
  FaSearch, 
  FaShoppingCart, 
  FaEdit, 
  FaTrash, 
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaFilter
} from "react-icons/fa";
// ¡IMPORTAR apiService!
import { apiService } from "../services/api";

const Perros = () => {
  const [perros, setPerros] = useState([]);
  const [filteredPerros, setFilteredPerros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [selectedPerro, setSelectedPerro] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    imagen: "",
    edad: "",
    raza: "",
    categoria: "perros"
  });

  const { addToCart, isAuthenticated } = useAppContext();
  const itemsPerPage = 6;

  // ====== AGREGADO: useEffect para el título de la página ======
  useEffect(() => {
    document.title = "Perros en Adopción - Hogar de Mascotas";
    
    // Actualizar meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Encuentra perritos en adopción responsable. Dale un hogar a un amigo fiel.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Encuentra perritos en adopción responsable. Dale un hogar a un amigo fiel.';
      document.head.appendChild(meta);
    }
    
    // Actualizar meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'perros, adopción, mascotas, animales, hogar');
    }
  }, []);
  // ====== FIN DEL AGREGADO ======

  useEffect(() => {
    cargarPerros();
  }, []);

  useEffect(() => {
    const filtered = perros.filter(perro =>
      perro.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perro.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      perro.raza?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPerros(filtered);
    setCurrentPage(1);
  }, [searchTerm, perros]);

  // ¡CORREGIR ESTA FUNCIÓN!
  const cargarPerros = async () => {
    setCargando(true);
    try {
      // ¡USAR apiService!
      const datos = await apiService.getPerros();
      setPerros(datos);
      setFilteredPerros(datos);
      setCargando(false);
    } catch {
      setError("Error al cargar los perros");
      setCargando(false);
      toast.error("Error al cargar datos");
    }
  };

  // Validación del formulario (Requerimiento #2)
  const validateForm = () => {
    const errors = [];
    
    if (!formData.nombre.trim()) errors.push("Nombre es obligatorio");
    if (formData.precio <= 0) errors.push("Precio debe ser mayor a 0");
    if (formData.descripcion.length < 10) errors.push("Descripción mínimo 10 caracteres");
    
    if (errors.length > 0) {
      errors.forEach(err => toast.error(err));
      return false;
    }
    return true;
  };

  // ¡CORREGIR ESTA FUNCIÓN!
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      if (selectedPerro) {
        // ¡USAR apiService.updatePerro()!
        await apiService.updatePerro(selectedPerro.id, formData);
      } else {
        // ¡USAR apiService.createPerro()!
        await apiService.createPerro(formData);
      }
      
      setShowForm(false);
      cargarPerros(); // Recargar lista
      resetForm();
    } catch {
      toast.error("Error al guardar");
    }
  };

  // ¡CORREGIR ESTA FUNCIÓN!
  const handleDelete = async (id) => {
    // Modal de confirmación (Requerimiento #2)
    if (window.confirm("¿Estás seguro de eliminar este perro de la lista de adopción?")) {
      try {
        // ¡USAR apiService.deletePerro()!
        await apiService.deletePerro(id);
        cargarPerros();
      } catch {
        toast.error("Error al eliminar");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      descripcion: "",
      precio: 0,
      imagen: "",
      edad: "",
      raza: "",
      categoria: "perros"
    });
    setSelectedPerro(null);
  };

  // Paginación (Requerimiento #4)
  const totalPages = Math.ceil(filteredPerros.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPerros = filteredPerros.slice(startIndex, startIndex + itemsPerPage);

  const handleAddToCart = (perro) => {
    addToCart(perro);
    toast.success(`${perro.nombre} agregado a adopción`);
  };

  if (cargando) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-secondary fs-5">Cargando perritos en adopción...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger fs-5">{error}</p>
        <button className="btn btn-primary" onClick={cargarPerros}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* ELIMINADO: Componente Helmet */}
      {/* <Helmet> ... </Helmet> */}

      <h4 className="text-center mb-4 p-3 rounded fw-bold"
          style={{ backgroundColor: "#FFF3E0", color: "#E65100" }}>
        LAS MASCOTAS ESTÁN EN ADOPCIÓN RESPONSABLE, EL COSTO ES SIMBÓLICO PARA LA REALIZACIÓN DE ESTE PROYECTO
      </h4>

      {/* Barra de búsqueda y filtros (Requerimiento #4) */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar perros por nombre, raza o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar perros"
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex gap-2">
            <button 
              className="btn btn-info d-flex align-items-center"
              onClick={() => {
                setSearchTerm("");
                cargarPerros();
              }}
            >
              <FaFilter className="me-2" /> Limpiar
            </button>
            
            {/* Botón para agregar nuevo perro (solo para admin) */}
            {isAuthenticated && (
              <button 
                className="btn btn-success d-flex align-items-center"
                onClick={() => {
                  resetForm();
                  setShowForm(!showForm);
                }}
              >
                <FaPlus className="me-2" /> Agregar Perro
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Formulario CRUD (Requerimiento #2) */}
      {showForm && (
        <div className="card mb-4 shadow">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">
              {selectedPerro ? "Editar Perro" : "Agregar Nuevo Perro para Adopción"}
            </h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmitForm}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Precio de adopción *</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.precio}
                    onChange={(e) => setFormData({...formData, precio: parseFloat(e.target.value) || 0})}
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción *</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  minLength="10"
                  required
                />
                <small className="text-muted">Mínimo 10 caracteres ({formData.descripcion.length}/10)</small>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">URL de Imagen</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.imagen}
                    onChange={(e) => setFormData({...formData, imagen: e.target.value})}
                    placeholder="https://ejemplo.com/perro.jpg"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Raza</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.raza}
                    onChange={(e) => setFormData({...formData, raza: e.target.value})}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {selectedPerro ? "Actualizar" : "Guardar Perro"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Paginación (Requerimiento #4) */}
      {filteredPerros.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span className="text-muted">
              Mostrando {paginatedPerros.length} de {filteredPerros.length} perros
            </span>
          </div>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-outline-primary"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            <span className="px-3 py-2">
              Página {currentPage} de {totalPages}
            </span>
            <button 
              className="btn btn-outline-primary"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* Lista de perros */}
      {filteredPerros.length === 0 ? (
        <div className="text-center py-5">
          <h5>No se encontraron perros con "{searchTerm}"</h5>
          <button className="btn btn-primary mt-3" onClick={() => setSearchTerm("")}>
            Ver todos los perros
          </button>
        </div>
      ) : (
        <ul className="d-flex flex-wrap justify-content-center gap-4 list-unstyled p-0">
          {paginatedPerros.map((perro) => (
            <li key={perro.id} className="card shadow-lg rounded-4 p-2 bg-light border-0 position-relative" style={{ width: "280px" }}>
              
              {/* Botones de edición/eliminación (solo para admin) */}
              {isAuthenticated && (
                <div className="position-absolute top-0 end-0 m-2">
                  <div className="btn-group">
                    <button 
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        setSelectedPerro(perro);
                        setFormData(perro);
                        setShowForm(true);
                      }}
                      title="Editar"
                      aria-label="Editar perro"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(perro.id)} // ← Pasar el id
                      title="Eliminar"
                      aria-label="Eliminar perro"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}

              <img
                src={perro.imagen}
                alt={perro.nombre}
                className="card-img-top rounded-4"
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{perro.nombre}</h5>
                {perro.raza && <p className="text-muted mb-1">{perro.raza}</p>}
                <p className="card-text fs-6 text-truncate">{perro.descripcion}</p>
                <p className="fw-bold fs-5 text-success">$ {perro.precio}</p>
                
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success d-flex align-items-center justify-content-center"
                    onClick={() => handleAddToCart(perro)}
                    aria-label={`Adoptar a ${perro.nombre}`}
                  >
                    <FaShoppingCart className="me-2" />
                    Adoptar
                  </button>
                  
                  <Link to={`/perros/${perro.id}/${perro.nombre}`} state={{ perro }}>
                    <button className="btn btn-primary w-100">
                      Más detalles
                    </button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Perros;