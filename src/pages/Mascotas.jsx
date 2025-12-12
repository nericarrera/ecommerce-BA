import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from '../hooks/useAppContext';
import { toast } from "react-toastify";
import { 
  FaSearch, 
  FaShoppingCart, 
  FaCat, 
  FaDog,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaPaw
} from "react-icons/fa";
import datosPerros from "../assets/perros.json";
import { apiService } from "../services/api";

const Mascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [filteredMascotas, setFilteredMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategoria, setFilterCategoria] = useState("todas");
  const itemsPerPage = 8;

  const { addToCart } = useAppContext();

  // ====== AGREGADO: useEffect para el título de la página ======
  useEffect(() => {
    document.title = "Todas las Mascotas en Adopción - Hogar de Mascotas";
    
    // Opcional: también puedes actualizar la meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Encuentra gatos y perros en adopción responsable. Dale un hogar amoroso a una mascota.');
    } else {
      // Crear el meta tag si no existe
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Encuentra gatos y perros en adopción responsable. Dale un hogar amoroso a una mascota.';
      document.head.appendChild(meta);
    }
    
    // Opcional: keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'mascotas, adopción, gatos, perros, animales, hogar');
    }
  }, []);
  // ====== FIN DEL AGREGADO ======

  useEffect(() => {
    cargarMascotas();
  }, []);

  useEffect(() => {
    // Filtrar por búsqueda y categoría
    let filtered = mascotas.filter(mascota =>
      mascota.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mascota.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mascota.raza?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filtrar por categoría
    if (filterCategoria !== "todas") {
      filtered = filtered.filter(mascota => mascota.categoria === filterCategoria);
    }

    setFilteredMascotas(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterCategoria, mascotas]);

  const cargarMascotas = async () => {
    setCargando(true);
    try {
      // Cargar gatos desde MockAPI
      const gatos = await apiService.getGatos();
      
      // Cargar perros desde JSON local (ya tienes)
      const perros = datosPerros.perros;
      
      // Combinar y agregar categoría si no existe
      const todasMascotas = [
        ...gatos.map(gato => ({ ...gato, categoria: "gatos" })),
        ...perros.map(perro => ({ ...perro, categoria: "perros" }))
      ];
      
      setMascotas(todasMascotas);
      setFilteredMascotas(todasMascotas);
      setCargando(false);
    } catch {
      setError("Error al cargar las mascotas");
      setCargando(false);
      toast.error("Error al cargar datos");
    }
  };

  // Paginación
  const totalPages = Math.ceil(filteredMascotas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMascotas = filteredMascotas.slice(startIndex, startIndex + itemsPerPage);

  const handleAddToCart = (mascota) => {
    addToCart(mascota);
    toast.success(`${mascota.nombre} agregado a adopción`);
  };

  const contarMascotasPorCategoria = () => {
    const gatos = mascotas.filter(m => m.categoria === "gatos").length;
    const perros = mascotas.filter(m => m.categoria === "perros").length;
    return { gatos, perros };
  };

  const { gatos, perros } = contarMascotasPorCategoria();

  if (cargando) {
    return (
      <div className="d-flex flex-column align-items-center mt-5 py-5">
        <div className="spinner-border text-primary mb-3" role="status" style={{ width: "3rem", height: "3rem" }}>
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="text-secondary fs-5">Buscando mascotas en busca de hogar...</p>
        <FaPaw className="text-primary mt-3" size={30} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5 py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">¡Oops!</h4>
          <p>{error}</p>
          <hr />
          <button className="btn btn-primary" onClick={cargarMascotas}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      {/* ELIMINADO: Componente Helmet */}
      {/* <Helmet> ... </Helmet> */}

      {/* Header con estadísticas */}
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold text-primary mb-3">
          <FaPaw className="me-2" />
          Mascotas en Busca de Hogar
        </h1>
        <p className="lead text-muted">
          Encuentra a tu compañero perfecto entre nuestras mascotas rescatadas
        </p>
        
        <div className="row justify-content-center mt-4">
          <div className="col-md-3 mb-3">
            <div className="card border-primary">
              <div className="card-body text-center">
                <FaCat className="text-primary mb-2" size={30} />
                <h3 className="card-title">{gatos}</h3>
                <p className="card-text text-muted">Gatitos</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-success">
              <div className="card-body text-center">
                <FaDog className="text-success mb-2" size={30} />
                <h3 className="card-title">{perros}</h3>
                <p className="card-text text-muted">Perritos</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card border-warning">
              <div className="card-body text-center">
                <FaPaw className="text-warning mb-2" size={30} />
                <h3 className="card-title">{mascotas.length}</h3>
                <p className="card-text text-muted">Total</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="input-group">
            <span className="input-group-text bg-primary text-white">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar mascotas por nombre, raza o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar mascotas"
            />
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <div className="input-group">
            <span className="input-group-text bg-info text-white">
              <FaFilter />
            </span>
            <select 
              className="form-select"
              value={filterCategoria}
              onChange={(e) => setFilterCategoria(e.target.value)}
            >
              <option value="todas">Todas las mascotas</option>
              <option value="gatos">Solo gatos</option>
              <option value="perros">Solo perros</option>
            </select>
          </div>
        </div>
        
        <div className="col-md-3 mb-3">
          <button 
            className="btn btn-outline-secondary w-100"
            onClick={() => {
              setSearchTerm("");
              setFilterCategoria("todas");
            }}
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {/* Información de resultados */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <span className="text-muted">
            Mostrando {paginatedMascotas.length} de {filteredMascotas.length} mascotas
            {filterCategoria !== "todas" && ` (${filterCategoria})`}
          </span>
        </div>
        
        {/* Paginación */}
        {filteredMascotas.length > 0 && (
          <div className="d-flex align-items-center gap-2">
            <button 
              className="btn btn-outline-primary btn-sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>
            <span className="px-3">
              Página {currentPage} de {totalPages}
            </span>
            <button 
              className="btn btn-outline-primary btn-sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* Mensaje si no hay resultados */}
      {filteredMascotas.length === 0 ? (
        <div className="text-center py-5 my-5 border rounded bg-light">
          <FaSearch className="text-muted mb-3" size={50} />
          <h4>No se encontraron mascotas</h4>
          <p className="text-muted mb-4">
            No hay mascotas que coincidan con "{searchTerm}"{filterCategoria !== "todas" && ` en la categoría ${filterCategoria}`}
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setSearchTerm("");
              setFilterCategoria("todas");
            }}
          >
            Ver todas las mascotas
          </button>
        </div>
      ) : (
        <>
          {/* Grid de mascotas */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {paginatedMascotas.map((mascota) => (
              <div key={`${mascota.categoria}-${mascota.id}`} className="col">
                <div className="card h-100 shadow-sm border-0 hover-shadow">
                  <div className="position-relative">
                    {/* Badge de categoría */}
                    <div className={`position-absolute top-0 start-0 m-2 badge ${mascota.categoria === "gatos" ? "bg-danger" : "bg-primary"}`}>
                      {mascota.categoria === "gatos" ? (
                        <><FaCat className="me-1" /> Gato</>
                      ) : (
                        <><FaDog className="me-1" /> Perro</>
                      )}
                    </div>
                    
                    <img
                      src={mascota.imagen}
                      alt={mascota.nombre}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.src = `https://source.unsplash.com/featured/300x200?${mascota.categoria}`;
                      }}
                    />
                  </div>
                  
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{mascota.nombre}</h5>
                    {mascota.raza && (
                      <p className="text-muted small mb-2">
                        <strong>Raza:</strong> {mascota.raza}
                      </p>
                    )}
                    <p className="card-text flex-grow-1 text-truncate-2">
                      {mascota.descripcion}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="h5 text-success mb-0">
                          $ {mascota.precio}
                        </span>
                        <span className="badge bg-light text-dark">
                          {mascota.edad || "Edad no especificada"}
                        </span>
                      </div>
                      
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-success d-flex align-items-center justify-content-center"
                          onClick={() => handleAddToCart(mascota)}
                        >
                          <FaShoppingCart className="me-2" />
                          Adoptar
                        </button>
                        
                        <Link 
                          to={`/${mascota.categoria}/${mascota.id}/${mascota.nombre}`} 
                          state={{ [mascota.categoria.slice(0, -1)]: mascota }}
                          className="btn btn-outline-primary"
                        >
                          Ver detalles
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación inferior */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-5">
              <nav aria-label="Paginación de mascotas">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    >
                      <FaChevronLeft /> Anterior
                    </button>
                  </li>
                  
                  {[...Array(totalPages).keys()].map(page => (
                    <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                      <button 
                        className="page-link"
                        onClick={() => setCurrentPage(page + 1)}
                      >
                        {page + 1}
                      </button>
                    </li>
                  ))}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    >
                      Siguiente <FaChevronRight />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}

      {/* Info importante */}
      <div className="alert alert-warning mt-5" role="alert">
        <h5 className="alert-heading">
          <FaPaw className="me-2" />
          Importante sobre la adopción
        </h5>
        <p className="mb-0">
          Todas nuestras mascotas están en <strong>adopción responsable</strong>. 
          El costo es simbólico y cubre gastos veterinarios, vacunas y cuidados básicos. 
          Nos aseguramos de que cada mascota encuentre un hogar amoroso y permanente.
        </p>
      </div>
    </div>
  );
};

export default Mascotas;