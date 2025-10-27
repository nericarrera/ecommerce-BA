import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, 
  faPaw, 
  faHeart, 
  faCalendarAlt,
  faVenusMars,
  faWeight,
  faRulerVertical,
  faShieldHeart,
  faStar,
  faShoppingCart,
  faShareAlt
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const DetallePerros = () => {
  const { id } = useParams(); // Eliminamos 'nombre' ya que no se usa
  const location = useLocation();
  const navigate = useNavigate();
  const perro = location.state?.perro;
  const [isFavorite, setIsFavorite] = useState(false);

  // Datos simulados para características adicionales
  const características = {
    edad: "2 años",
    sexo: "Macho",
    peso: "12 kg",
    tamaño: "Mediano",
    raza: "Labrador Mix",
    vacunado: true,
    esterilizado: true,
    personalidad: ["Juguetón", "Cariñoso", "Inteligente"]
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const agregarAlCarrito = () => {
    // Aquí iría la lógica para agregar al carrito
    alert(`¡${perro.nombre} agregado al carrito! 🛒`);
  };

  if (!perro) {
    return (
      <div 
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center px-3"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        }}
      >
        <FontAwesomeIcon 
          icon={faPaw} 
          className="mb-4"
          style={{
            fontSize: "4rem",
            background: "linear-gradient(135deg, #78dbe2, #ff77b8)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        />
        <h3 className="fw-bold mb-3 gradient-text">
          Mascota no encontrada
        </h3>
        <p className="mb-4 fs-5" style={{ color: "#cbd5e1", maxWidth: "500px" }}>
          Lo sentimos, no pudimos encontrar la información de esta mascota. 
          Puede que haya sido adoptada recientemente.
        </p>
        <Link to="/perros" className="text-decoration-none">
          <button 
            className="btn fw-bold px-4 py-3 rounded-pill d-flex align-items-center"
            style={{
              background: "linear-gradient(135deg, #78dbe2, #667eea)",
              color: "#0f172a",
              border: "none",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 10px 25px rgba(120, 219, 226, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            <FontAwesomeIcon icon={faPaw} className="me-2" />
            Explorar Otras Mascotas
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div 
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      }}
    >
      {/* Efecto de partículas de fondo */}
      <div 
        className="position-absolute top-0 left-0 w-100 h-100"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 219, 226, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 184, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }}
      />

      <div className="container position-relative">
        {/* Header y navegación */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <button
                onClick={() => navigate("/perros")}
                className="btn d-flex align-items-center px-3 py-2 rounded-pill"
                style={{
                  background: "rgba(30, 41, 59, 0.8)",
                  color: "#78dbe2",
                  border: "1px solid rgba(120, 219, 226, 0.3)",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(120, 219, 226, 0.1)";
                  e.target.style.transform = "translateX(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(30, 41, 59, 0.8)";
                  e.target.style.transform = "translateX(0)";
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Volver
              </button>

              <div className="d-flex gap-2">
                <button
                  onClick={toggleFavorite}
                  className="btn p-2 rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    background: isFavorite 
                      ? "rgba(255, 119, 184, 0.2)" 
                      : "rgba(30, 41, 59, 0.8)",
                    color: isFavorite ? "#ff77b8" : "#94a3b8",
                    border: `1px solid ${isFavorite ? "rgba(255, 119, 184, 0.4)" : "rgba(148, 163, 184, 0.3)"}`,
                    width: "45px",
                    height: "45px",
                    transition: "all 0.3s ease"
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button>

                <button
                  className="btn p-2 rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    background: "rgba(30, 41, 59, 0.8)",
                    color: "#94a3b8",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    width: "45px",
                    height: "45px",
                    transition: "all 0.3s ease"
                  }}
                >
                  <FontAwesomeIcon icon={faShareAlt} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {/* Columna de la imagen */}
          <div className="col-lg-6 mb-4">
            <div 
              className="rounded-4 overflow-hidden position-relative"
              style={{
                border: "1px solid rgba(120, 219, 226, 0.3)",
                background: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(10px)"
              }}
            >
              <img
                src={perro.imagen}
                alt={perro.nombre}
                className="img-fluid w-100"
                style={{ 
                  maxHeight: "500px", 
                  objectFit: "cover",
                  display: "block"
                }}
              />
              
              {/* Badge de estado */}
              <div 
                className="position-absolute top-3 start-3 px-3 py-2 rounded-pill d-flex align-items-center"
                style={{
                  background: "rgba(16, 185, 129, 0.9)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <FontAwesomeIcon 
                  icon={faShieldHeart} 
                  className="me-2"
                  style={{ color: "#fff", fontSize: "0.8rem" }}
                />
                <span className="small fw-bold text-white">Disponible</span>
              </div>
            </div>
          </div>

          {/* Columna de información */}
          <div className="col-lg-6">
            <div 
              className="rounded-4 p-4 h-100"
              style={{
                background: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(120, 219, 226, 0.2)"
              }}
            >
              {/* Header de información */}
              <div className="mb-4">
                <h1 
                  className="fw-bold mb-2"
                  style={{ 
                    color: "#e2e8f0",
                    fontSize: "2.5rem"
                  }}
                >
                  {perro.nombre}
                </h1>
                <p className="mb-3 fs-5" style={{ color: "#78dbe2" }}>
                  {características.raza}
                </p>
                
                {/* Rating */}
                <div className="d-flex align-items-center mb-3">
                  <div className="d-flex me-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesomeIcon 
                        key={star}
                        icon={faStar}
                        className="me-1"
                        style={{ 
                          color: star <= 4 ? "#ffd700" : "#94a3b8",
                          fontSize: "0.9rem"
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ color: "#94a3b8", fontSize: "0.9rem" }}>
                    4.8 (24 reviews)
                  </span>
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <h5 className="fw-semibold mb-3" style={{ color: "#e2e8f0" }}>
                  Sobre {perro.nombre}
                </h5>
                <p 
                  className="mb-0"
                  style={{ 
                    color: "#cbd5e1", 
                    lineHeight: "1.7",
                    fontSize: "1.1rem"
                  }}
                >
                  {perro.descripcion}
                </p>
              </div>

              {/* Características */}
              <div className="mb-4">
                <h5 className="fw-semibold mb-3" style={{ color: "#e2e8f0" }}>
                  Características
                </h5>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon 
                        icon={faCalendarAlt} 
                        className="me-3"
                        style={{ color: "#78dbe2", width: "20px" }}
                      />
                      <div>
                        <div className="small" style={{ color: "#94a3b8" }}>Edad</div>
                        <div style={{ color: "#e2e8f0" }}>{características.edad}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon 
                        icon={faVenusMars} 
                        className="me-3"
                        style={{ color: "#78dbe2", width: "20px" }}
                      />
                      <div>
                        <div className="small" style={{ color: "#94a3b8" }}>Sexo</div>
                        <div style={{ color: "#e2e8f0" }}>{características.sexo}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon 
                        icon={faWeight} 
                        className="me-3"
                        style={{ color: "#78dbe2", width: "20px" }}
                      />
                      <div>
                        <div className="small" style={{ color: "#94a3b8" }}>Peso</div>
                        <div style={{ color: "#e2e8f0" }}>{características.peso}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon 
                        icon={faRulerVertical} 
                        className="me-3"
                        style={{ color: "#78dbe2", width: "20px" }}
                      />
                      <div>
                        <div className="small" style={{ color: "#94a3b8" }}>Tamaño</div>
                        <div style={{ color: "#e2e8f0" }}>{características.tamaño}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personalidad */}
              <div className="mb-4">
                <h5 className="fw-semibold mb-3" style={{ color: "#e2e8f0" }}>
                  Personalidad
                </h5>
                <div className="d-flex flex-wrap gap-2">
                  {características.personalidad.map((trait, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 rounded-pill small"
                      style={{
                        background: "rgba(120, 219, 226, 0.1)",
                        color: "#78dbe2",
                        border: "1px solid rgba(120, 219, 226, 0.3)"
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Precio y acciones */}
              <div className="border-top pt-4" style={{ borderColor: "rgba(148, 163, 184, 0.2) !important" }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <div className="small" style={{ color: "#94a3b8" }}>Costo de adopción</div>
                    <h3 
                      className="fw-bold mb-0"
                      style={{ 
                        background: "linear-gradient(135deg, #78dbe2, #ff77b8)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}
                    >
                      ${perro.precio}
                    </h3>
                  </div>
                  
                  <div className="d-flex gap-3">
                    <button
                      onClick={agregarAlCarrito}
                      className="btn fw-bold px-4 py-3 rounded-pill d-flex align-items-center"
                      style={{
                        background: "linear-gradient(135deg, #78dbe2, #667eea)",
                        color: "#0f172a",
                        border: "none",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 10px 25px rgba(120, 219, 226, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                      Adoptar
                    </button>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon 
                      icon={faShieldHeart} 
                      className="me-2"
                      style={{ color: "#10b981" }}
                    />
                    <span className="small" style={{ color: "#94a3b8" }}>
                      Salud verificada
                    </span>
                  </div>
                  <span className="small" style={{ color: "#94a3b8" }}>
                    ID: {id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallePerros;
