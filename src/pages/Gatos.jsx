import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
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
import { apiService } from "../services/api";

const Gatos = () => {
  const [gatos, setGatos] = useState([]);
  const [filteredGatos, setFilteredGatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [selectedGato, setSelectedGato] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    imagen: "",
    edad: "",
    raza: "",
    categoria: "gatos"
  });

  const { addToCart, isAuthenticated } = useAppContext();
  const itemsPerPage = 6;

  useEffect(() => {
    cargarGatos();
  }, []);

  useEffect(() => {
    const filtered = gatos.filter(gato =>
      gato.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gato.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGatos(filtered);
    setCurrentPage(1);
  }, [searchTerm, gatos]);

  const cargarGatos = async () => {
    setCargando(true);
    try {
      const datos = await apiService.getGatos();
      setGatos(datos);
      setFilteredGatos(datos);
      setCargando(false);
    } catch {
      setError("Error al cargar los gatos");
      setCargando(false);
      toast.error("Error al cargar datos de gatos");
    }
  };

  const validateForm = () => {
    if (!formData.nombre.trim()) {
      toast.error("Nombre es obligatorio");
      return false;
    }
    if (formData.precio <= 0) {
      toast.error("Precio debe ser mayor a 0");
      return false;
    }
    if (formData.descripcion.length < 10) {
      toast.error("Descripción mínimo 10 caracteres");
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      if (selectedGato) {
        await apiService.updateGato(selectedGato.id, formData);
      } else {
        await apiService.createGato(formData);
      }
      setShowForm(false);
      cargarGatos();
      resetForm();
    } catch {
      toast.error("Error al guardar");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar este gato de la lista de adopción?")) {
      try {
        await apiService.deleteGato(id);
        cargarGatos();
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
      categoria: "gatos"
    });
    setSelectedGato(null);
  };

  const totalPages = Math.ceil(filteredGatos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedGatos = filteredGatos.slice(startIndex, startIndex + itemsPerPage);

  const handleAddToCart = (gato) => {
    addToCart(gato);
    toast.success(`${gato.nombre} agregado a adopción`);
  };

  if (cargando) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-secondary fs-5">Cargando gatitos en adopción...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger fs-5">{error}</p>
        <button className="btn btn-primary" onClick={cargarGatos}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <Helmet>
        <title>Gatos en Adopción - Hogar de Mascotas</title>
        <meta name="description" content="Encuentra gatitos en adopción responsable. Dale un hogar amoroso a un felino." />
        <meta name="keywords" content="gatos, adopción, mascotas, felinos, hogar" />
      </Helmet>

      <h4 className="text-center mb-4 p-3 rounded fw-bold"
          style={{ backgroundColor: "#FFEBEE", color: "#C62828" }}>
        LAS MASCOTAS ESTÁN EN ADOPCIÓN RESPONSABLE, EL COSTO ES SIMBÓLICO PARA LA REALIZACIÓN DE ESTE PROYECTO
      </h4>

      {/* Barra de búsqueda */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar gatos por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar gatos"
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex gap-2">
            <button 
              className="btn btn-info d-flex align-items-center"
              onClick={() => {
                setSearchTerm("");
                cargarGatos();
              }}
            >
              <FaFilter className="me-2" /> Limpiar
            </button>
            
            {isAuthenticated && (
              <button 
                className="btn btn-success d-flex align-items-center"
                onClick={() => {
                  resetForm();
                  setShowForm(!showForm);
                }}
              >
                <FaPlus className="me-2" /> Agregar Gato
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Formulario CRUD */}
      {showForm && (
        <div className="card mb-4 shadow">
          <div className="card-header bg-danger text-white">
            <h5 className="mb-0">
              {selectedGato ? "Editar Gato" : "Agregar Nuevo Gato para Adopción"}
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
                  <label className="form-label">Precio *</label>
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
              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-danger">
                  {selectedGato ? "Actualizar" : "Guardar Gato"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Paginación */}
      {filteredGatos.length > 0 && (
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <span className="text-muted">
              Mostrando {paginatedGatos.length} de {filteredGatos.length} gatos
            </span>
          </div>
          <div className="d-flex gap-2">
            <button 
              className="btn btn-outline-danger"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            <span className="px-3 py-2">
              Página {currentPage} de {totalPages}
            </span>
            <button 
              className="btn btn-outline-danger"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* Lista de gatos */}
      {filteredGatos.length === 0 ? (
        <div className="text-center py-5">
          <h5>No se encontraron gatos con "{searchTerm}"</h5>
          <button className="btn btn-danger mt-3" onClick={() => setSearchTerm("")}>
            Ver todos los gatos
          </button>
        </div>
      ) : (
        <ul className="d-flex flex-wrap justify-content-center gap-4 list-unstyled p-0">
          {paginatedGatos.map((gato) => (
            <li key={gato.id} className="card shadow-lg rounded-4 p-2 bg-light border-0 position-relative" style={{ width: "280px" }}>
              
              {isAuthenticated && (
                <div className="position-absolute top-0 end-0 m-2">
                  <div className="btn-group">
                    <button 
                      className="btn btn-warning btn-sm"
                      onClick={() => {
                        setSelectedGato(gato);
                        setFormData(gato);
                        setShowForm(true);
                      }}
                      title="Editar"
                      aria-label="Editar gato"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(gato.id)}
                      title="Eliminar"
                      aria-label="Eliminar gato"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}

              <img
                src={gato.imagen}
                alt={gato.nombre}
                className="card-img-top rounded-4"
                style={{ width: "100%", height: "250px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{gato.nombre}</h5>
                <p className="card-text fs-6 text-truncate">{gato.descripcion}</p>
                <p className="fw-bold fs-5 text-success">$ {gato.precio}</p>
                
                <div className="d-grid gap-2">
                  <button
                    className="btn btn-success d-flex align-items-center justify-content-center"
                    onClick={() => handleAddToCart(gato)}
                    aria-label={`Adoptar a ${gato.nombre}`}
                  >
                    <FaShoppingCart className="me-2" />
                    Adoptar
                  </button>
                  
                  <Link to={`/gatos/${gato.id}/${gato.nombre}`} state={{ gato }}>
                    <button className="btn btn-danger w-100">
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

export default Gatos;