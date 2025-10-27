import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPaw, 
  faHeart,  
  faPlay, 
  faPause,
  faArrowRight,
  faStar,
  faUsers,
  faShieldHeart
} from "@fortawesome/free-solid-svg-icons";

function Inicio() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "500+", label: "Mascotas Adoptadas", icon: faHeart },
    { number: "98%", label: "Satisfacción", icon: faStar },
    { number: "24/7", label: "Soporte", icon: faUsers },
    { number: "100%", label: "Compromiso", icon: faShieldHeart }
  ];

  const toggleVideo = () => {
    setIsVideoPlaying(!isVideoPlaying);
  };

  return (
    <div 
      className="min-vh-100 position-relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
      }}
    >
      {/* Efecto de partículas de fondo */}
      <div 
        className="position-absolute top-0 left-0 w-100 h-100"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(120, 219, 226, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 184, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(102, 126, 234, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }}
      />

      <div className="container-fluid px-4 py-5 position-relative">
        {/* Hero Section */}
        <div className="row align-items-center min-vh-100 py-5">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className={`transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {/* Badge de bienvenida */}
              <div 
                className="d-inline-flex align-items-center px-3 py-2 rounded-pill mb-4"
                style={{
                  background: "rgba(120, 219, 226, 0.1)",
                  border: "1px solid rgba(120, 219, 226, 0.3)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <FontAwesomeIcon 
                  icon={faPaw} 
                  className="me-2"
                  style={{ color: "#78dbe2", fontSize: "0.9rem" }}
                />
                <span style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>
                  Transformando vidas desde 2025
                </span>
              </div>

              {/* Título principal */}
              <h1 
                className="display-3 fw-bold mb-4"
                style={{
                  background: "linear-gradient(135deg, #78dbe2, #ff77b8, #667eea)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: "1.2"
                }}
              >
                Adopciones
                <span className="d-block">Transfor</span>
              </h1>

              <h2 
                className="h3 mb-4 fw-light"
                style={{ color: "#e2e8f0" }}
              >
                Donde el amor por las mascotas encuentra 
                <span 
                  className="fw-bold d-block"
                  style={{
                    background: "linear-gradient(90deg, #78dbe2, #ff77b8)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  su hogar perfecto
                </span>
              </h2>

              {/* Texto descriptivo */}
              <p 
                className="lead mb-5"
                style={{ 
                  color: "#cbd5e1", 
                  lineHeight: "1.7",
                  fontSize: "1.2rem"
                }}
              >
                Adoptar una mascota es darle un hogar lleno de amor y cuidado. 
                En <strong>Adopciones Transfor</strong> nos dedicamos a crear 
                conexiones que transforman vidas para siempre.
              </p>

              {/* Botones de acción */}
              <div className="d-flex flex-wrap gap-3 mb-5">
                <Link to="/mascotas" className="text-decoration-none">
                  <button 
                    className="btn fw-bold px-4 py-3 rounded-pill d-flex align-items-center"
                    style={{
                      background: "linear-gradient(135deg, #78dbe2, #667eea)",
                      color: "#0f172a",
                      border: "none",
                      transition: "all 0.3s ease",
                      minWidth: "200px"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-3px) scale(1.02)";
                      e.target.style.boxShadow = "0 15px 30px rgba(120, 219, 226, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0) scale(1)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <FontAwesomeIcon icon={faPaw} className="me-2" />
                    Ver Mascotas
                    <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                  </button>
                </Link>

                <Link to="/servicios" className="text-decoration-none">
                  <button 
                    className="btn fw-bold px-4 py-3 rounded-pill"
                    style={{
                      background: "transparent",
                      color: "#78dbe2",
                      border: "2px solid rgba(120, 219, 226, 0.5)",
                      transition: "all 0.3s ease",
                      minWidth: "180px"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(120, 219, 226, 0.1)";
                      e.target.style.transform = "translateY(-3px)";
                      e.target.style.boxShadow = "0 10px 25px rgba(120, 219, 226, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    Nuestros Servicios
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="col-lg-6">
            <div 
              className="position-relative rounded-4 overflow-hidden shadow-lg"
              style={{
                border: "1px solid rgba(120, 219, 226, 0.3)",
                background: "rgba(15, 23, 42, 0.6)",
                backdropFilter: "blur(10px)",
                transform: isVisible ? "translateY(0)" : "translateY(50px)",
                opacity: isVisible ? 1 : 0,
                transition: "all 0.8s ease"
              }}
            >
              <video
                src="videos/Video_Gatos.mp4"
                controls={false}
                autoPlay={isVideoPlaying}
                loop
                muted
                className="w-100"
                style={{
                  borderRadius: "12px",
                  display: "block"
                }}
              />
              
              {/* Overlay del video */}
              <div 
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{
                  background: "rgba(15, 23, 42, 0.3)",
                  opacity: isVideoPlaying ? 0 : 1,
                  transition: "opacity 0.3s ease",
                  cursor: "pointer"
                }}
                onClick={toggleVideo}
              >
                {!isVideoPlaying && (
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "80px",
                      height: "80px",
                      background: "linear-gradient(135deg, #78dbe2, #667eea)",
                      color: "#0f172a"
                    }}
                  >
                    <FontAwesomeIcon icon={faPlay} size="2x" />
                  </div>
                )}
              </div>

              {/* Controles del video */}
              <div 
                className="position-absolute bottom-3 start-3"
                style={{
                  background: "rgba(15, 23, 42, 0.8)",
                  borderRadius: "25px",
                  padding: "8px 16px",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(120, 219, 226, 0.2)"
                }}
              >
                <button
                  onClick={toggleVideo}
                  className="btn p-0 border-0"
                  style={{ color: "#78dbe2" }}
                >
                  <FontAwesomeIcon icon={isVideoPlaying ? faPause : faPlay} />
                  <span className="ms-2" style={{ color: "#cbd5e1", fontSize: "0.9rem" }}>
                    {isVideoPlaying ? "Pausar" : "Reproducir"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row py-5 mt-5">
          <div className="col-12">
            <div className="row g-4">
              {stats.map((stat, index) => (
                <div key={index} className="col-lg-3 col-md-6">
                  <div 
                    className="text-center p-4 rounded-3 glass-effect h-100"
                    style={{
                      border: "1px solid rgba(120, 219, 226, 0.2)",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.borderColor = "rgba(120, 219, 226, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(120, 219, 226, 0.2)";
                    }}
                  >
                    <FontAwesomeIcon 
                      icon={stat.icon} 
                      className="mb-3"
                      style={{
                        fontSize: "2rem",
                        background: "linear-gradient(135deg, #78dbe2, #ff77b8)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}
                    />
                    <h3 
                      className="fw-bold mb-2"
                      style={{ 
                        color: "#78dbe2",
                        fontSize: "2.5rem"
                      }}
                    >
                      {stat.number}
                    </h3>
                    <p 
                      className="mb-0"
                      style={{ color: "#cbd5e1" }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
