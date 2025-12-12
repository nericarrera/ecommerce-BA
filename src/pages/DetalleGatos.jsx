// src/pages/DetalleGatos.jsx
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowLeft, 
  faHeart, 
  faCalendarAlt,
  faVenusMars,
  faWeight,
  faRulerVertical,
  faShieldHeart,
  faStar,
  faShoppingCart,
  faShareAlt,
  faCat
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAppContext } from "../context/useAppContext"; 
import { toast } from "react-toastify";

const DetalleGatos = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const gato = location.state?.gato;
  const [isFavorite, setIsFavorite] = useState(false);
  
  // AGREGAR EL CONTEXTO
  const { addToCart } = useAppContext();

  // Datos simulados para características adicionales de gatos
  const características = {
    edad: "1.5 años",
    sexo: "Hembra",
    peso: "4 kg",
    tamaño: "Pequeño",
    raza: "Siamés Mix",
    vacunado: true,
    esterilizado: true,
    personalidad: ["Curioso", "Independiente", "Cariñoso", "Juguetón"],
    nivelEnergia: "Moderado",
    compatibilidad: ["Solo", "Con otros gatos", "Con niños mayores"],
    cuidadosEspeciales: "Necesita cepillado semanal"
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removido de favoritos" : "Agregado a favoritos");
  };

  const agregarAlCarrito = () => {
    if (!gato) {
      toast.error('No se encontró información del gato');
      return;
    }
    
    console.log('🎯 Agregando gato al carrito:', gato);
    
    // Usar addToCart del contexto
    addToCart({
      ...gato,
      categoria: 'gato'
    });
    
    // Mostrar notificación con toast
    toast.success(`¡${gato.nombre} agregado al carrito para adopción! 🐱`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  if (!gato) {
    return (
      <div 
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center px-3"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        }}
      >
        <FontAwesomeIcon 
          icon={faCat} 
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
          Gatito no encontrado
        </h3>
        <p className="mb-4 fs-5" style={{ color: "#cbd5e1", maxWidth: "500px" }}>
          Lo sentimos, no pudimos encontrar la información de este felino. 
          Puede que haya encontrado un hogar recientemente.
        </p>
        <Link to="/gatos" className="text-decoration-none">
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
            <FontAwesomeIcon icon={faCat} className="me-2" />
            Explorar Otros Gatitos
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
                onClick={() => navigate("/gatos")}
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
                Volver a Gatos
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
                src={gato.imagen}
                alt={gato.nombre}
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

              {/* Badge especial para gatos */}
              <div 
                className="position-absolute top-3 end-3 px-3 py-2 rounded-pill d-flex align-items-center"
                style={{
                  background: "rgba(120, 219, 226, 0.9)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <FontAwesomeIcon 
                  icon={faCat} 
                  className="me-2"
                  style={{ color: "#0f172a", fontSize: "0.8rem" }}
                />
                <span className="small fw-bold" style={{ color: "#0f172a" }}>Felino</span>
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
                  {gato.nombre}
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
                    4.9 (18 reviews)
                  </span>
                </div>
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <h5 className="fw-semibold mb-3" style={{ color: "#e2e8f0" }}>
                  Sobre {gato.nombre}
                </h5>
                <p 
                  className="mb-0"
                  style={{ 
                    color: "#cbd5e1", 
                    lineHeight: "1.7",
                    fontSize: "1.1rem"
                  }}
                >
                  {gato.descripcion}
                </p>
              </div>

              {/* Características específicas de gatos */}
              <div className="mb-4">
                <h5 className="fw-semibold mb-3" style={{ color: "#e2e8f0" }}>
                  Características del Gatito
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
                  Personalidad Felina
                </h5>
                <div className="d-flex flex-wrap gap-2 mb-3">
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
                
                {/* Nivel de energía */}
                <div className="mt-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="small" style={{ color: "#94a3b8" }}>Nivel de energía:</span>
                    <span style={{ color: "#e2e8f0" }}>{características.nivelEnergia}</span>
                  </div>
                  <div 
                    className="progress rounded-pill"
                    style={{ 
                      height: "6px",
                      background: "rgba(30, 41, 59, 0.8)"
                    }}
                  >
                    <div 
                      className="progress-bar rounded-pill"
                      style={{ 
                        width: "60%",
                        background: "linear-gradient(90deg, #78dbe2, #667eea)"
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Compatibilidad */}
              <div className="mb-4">
                <h5 className="fw-semibold mb-3" style={{ color: "#e2e8f0" }}>
                  Compatibilidad
                </h5>
                <div className="d-flex flex-wrap gap-2">
                  {características.compatibilidad.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 rounded-pill small"
                      style={{
                        background: "rgba(16, 185, 129, 0.1)",
                        color: "#10b981",
                        border: "1px solid rgba(16, 185, 129, 0.3)"
                      }}
                    >
                      {item}
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
                      ${gato.precio}
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
                      Adoptar Gatito
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
                      Salud verificada • {características.cuidadosEspeciales}
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

export default DetalleGatos;